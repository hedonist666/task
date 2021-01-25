#define NAPI_CPP_EXCEPTIONS
#include <napi.h>
#include <sstream>
#include <functional>
#include <exception>
#include "utils.h"

using namespace Napi;

int SIZE;
double mae(unordered_map<int, double> *y_true, unordered_map<int, double> *y_pred, int *ind, int size);
double rmape(unordered_map<int, double> *y_true, unordered_map<int, double> *y_pred, int *ind, int size);

struct CSVBuff : public Napi::ObjectWrap<CSVBuff> {
    unordered_map<int, double> data;

    CSVBuff(const Napi::CallbackInfo& info) : ObjectWrap{info} {
        Napi::Env env = info.Env();
        if (info.Length() < 1) {
            Napi::TypeError::New(env, "Wrong number of arguments") .ThrowAsJavaScriptException();
            return;
        }
        try {
            read_data_csv(info[0].ToString(), &data);
        }
        catch (const char* e) {
            Napi::Error::New(env, string("Error reading csv file: ") + string(e)).ThrowAsJavaScriptException();
            return;
        }
    }

    Napi::Value size(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        return Napi::Number::New(env, data.size());
    }

    Napi::Value get(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        if (info.Length() < 1) {
            Napi::TypeError::New(env, "Wrong number of arguments") .ThrowAsJavaScriptException();
            return env.Null();
        }
        if (!info[0].IsNumber()) {
            Napi::TypeError::New(env, "Wrong type: Expected Integer") .ThrowAsJavaScriptException();
            return env.Null();
        }
        return Napi::Number::New(env, data[info[0].As<Napi::Number>()]);
    }

    Napi::Value toString(const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        stringstream str;
        for (auto it = data.begin(); it != data.end(); ++it) {
            str << it->first << ": " << it->second << endl;
        }
        return Napi::String::New(env, str.str());
    }

    static Napi::Function GetClass(Napi::Env env) {
        return DefineClass(env, "CSVBuff", {
            CSVBuff::InstanceMethod("get", &CSVBuff::get),
            CSVBuff::InstanceMethod("toString", &CSVBuff::toString),
            CSVBuff::InstanceMethod("size", &CSVBuff::size)
        });
    }
};

template<typename F> 
Napi::Function MetricWrapper(Napi::Env env, F fun) {
    return Napi::Function::New(env, [env, fun](const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        if (info.Length() < 3) {
            Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
            return env.Null();
        }
        int* ind;
        unordered_map<int, double>* table1;
        unordered_map<int, double>* table2;

        if (info[0].IsString()) {
            table1 = new unordered_map<int, double>;
            try {
                read_data_csv(info[0].ToString(), table1);
            }
            catch (const char* e) {
                Napi::Error::New(env, string("Error reading csv file: ") + string(e)).ThrowAsJavaScriptException();
                return env.Null();
            }
        }
        else if (info[0].IsObject()) {
            table1 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[0].As<Napi::Object>())->data;
        }
        else {
            Napi::TypeError::New(env, "Expected file name or CSVBuff object").ThrowAsJavaScriptException();
            return env.Null();
        }

        if (info[1].IsString()) {
            table2 = new unordered_map<int, double>;
            try {
                read_data_csv(info[1].ToString(), table2);
            }
            catch (const char* e) {
                Napi::Error::New(env, string("Error reading csv file: ") + string(e)).ThrowAsJavaScriptException();
                return env.Null();
            }
        }
        else if (info[1].IsObject()) {
            table2 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[1].As<Napi::Object>())->data;
        }
        else {
            Napi::TypeError::New(env, "Expected file name or CSVBuff object").ThrowAsJavaScriptException();
            return env.Null();
        }
            
        if (info[2].IsString()) {
            try {
                ind = read_indexes(info[2].ToString());
            }
            catch (const ifstream::failure& e) {
                Napi::Error::New(env, string("Error reading index file: ") + e.what()).ThrowAsJavaScriptException();
                return env.Null();
            }
        }
        else if (info[2].IsArray()) {
            Napi::Array _ind = info[2].As<Napi::Array>();
            if (!_ind.Get(ssize_t{0}).IsNumber()) {
                Napi::TypeError::New(env, "Wrong type: Specify array of numbers as indexes").ThrowAsJavaScriptException();
                return env.Null();
            }
            SIZE = _ind.Get(ssize_t{0}).ToNumber().Uint32Value();
            ind = new int[_ind.Length() - 1];
            for (size_t i = 1; i < _ind.Length(); ++i) {
                if (!_ind.Get(i).IsNumber()) {
                    Napi::TypeError::New(env, "Wrong type: Specify array of numbers as indexes").ThrowAsJavaScriptException();
                    return env.Null();
                }
                ind[i - 1] = _ind.Get(i).ToNumber().Uint32Value();
            }
        }
        else {
            Napi::TypeError::New(env, "Expected file name or array of Numbers").ThrowAsJavaScriptException();
            return env.Null();
        }
        double res;
        try {
            res = fun(table1, table2, ind, SIZE);
        }
        catch (const char* e) {
            if (info[0].IsString()) delete table1;
            if (info[1].IsString()) delete table2;
            delete ind;
            Napi::Error::New(env, "Error calculating: " + string(e)).ThrowAsJavaScriptException();
            return env.Null();
        } 
        if (info[0].IsString()) delete table1;
        if (info[1].IsString()) delete table2;
        delete ind;
        return (Napi::Value)Napi::Number::New(env, res);
    });
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "rmape"), MetricWrapper(env, rmape));
    exports.Set(Napi::String::New(env, "mae"), MetricWrapper(env, mae));
    exports.Set(Napi::String::New(env, "CSVBuff"), CSVBuff::GetClass(env));
    return exports;
}

NODE_API_MODULE(addon, Init)

#define NAPI_CPP_EXCEPTIONS
#include <napi.h>
#include <sstream>
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
        read_data_csv(info[0].ToString(), &data);
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
            CSVBuff::InstanceMethod("toString", &CSVBuff::toString)
        });
    }
};


Napi::Value MaeWrapper(const Napi::CallbackInfo& info) {
    static ofstream ofn {"mae_log.txt"};
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
        read_data_csv(info[0].ToString(), table1);
    }
    else if (info[0].IsObject()) {
        table1 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[0].As<Napi::Object>())->data;
        for (auto it = table1->begin(); it != table1->end(); ++it) {
            ofn << it->first << ": " << it->second << endl;
        }
    }
    else {
        Napi::TypeError::New(env, "Expected file name or CSVBuff object").ThrowAsJavaScriptException();
        return env.Null();
    }

    if (info[1].IsString()) {
        ofn << "arg 2 created from source" << endl;;
        table2 = new unordered_map<int, double>;
        read_data_csv(info[1].ToString(), table2);
    }
    else if (info[1].IsObject()) {
        table2 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[1].As<Napi::Object>())->data;
        ofn << "got data from buffer" << endl;
        for (auto it = table2->begin(); it != table2->end(); ++it) {
            ofn << it->first << ": " << it->second << endl;
        }
    }
    else {
        Napi::TypeError::New(env, "Expected file name or CSVBuff object").ThrowAsJavaScriptException();
        return env.Null();
    }
        
    if (info[2].IsString()) {
        ind = read_indexes(info[2].ToString());
    }
    else if (info[2].IsArray()) {
        Napi::Array _ind = info[2].As<Napi::Array>();
        ind = new int[_ind.Length()];
        for (size_t i = 0; i < _ind.Length(); ++i) {
            if (!_ind.Get(i).IsNumber()) {
                Napi::TypeError::New(env, "Wrong type: Specify array of numbers as indexes").ThrowAsJavaScriptException();
                return env.Null();
            }
            ind[i] = _ind.Get(i).ToNumber().Uint32Value();
        }
    }
    else {
        Napi::TypeError::New(env, "Expected file name or array of Numbers").ThrowAsJavaScriptException();
        return env.Null();
    }
    double res = mae(table1, table2, ind, SIZE);
    if (info[0].IsString()) delete table1;
    if (info[1].IsString()) delete table2;
    delete ind;
    return Napi::Number::New(env, res);
}

Napi::Value RmapeWrapper(const Napi::CallbackInfo& info) {
    static ofstream ofn{"rmae_log.txt"};
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
        read_data_csv(info[0].ToString(), table1);
    }
    else if (info[0].IsObject()) {
        table1 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[0].As<Napi::Object>())->data;
        for (auto it = table1->begin(); it != table1->end(); ++it) {
            ofn << it->first << ": " << it->second << endl;
        }
    }
    else {
        Napi::TypeError::New(env, "Expected file name or CSVBuff object").ThrowAsJavaScriptException();
        return env.Null();
    }

    if (info[1].IsString()) {
        ofn << "arg 2 created from source" << endl;;
        table2 = new unordered_map<int, double>;
        read_data_csv(info[1].ToString(), table2);
    }
    else if (info[1].IsObject()) {
        table2 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[1].As<Napi::Object>())->data;
        ofn << "got data from buffer" << endl;
        for (auto it = table2->begin(); it != table2->end(); ++it) {
            ofn << it->first << ": " << it->second << endl;
        }
    }
    else {
        Napi::TypeError::New(env, "Expected file name or CSVBuff object").ThrowAsJavaScriptException();
        return env.Null();
    }
        
    if (info[2].IsString()) {
        ind = read_indexes(info[2].ToString());
    }
    else if (info[2].IsArray()) {
        Napi::Array _ind = info[2].As<Napi::Array>();
        ind = new int[_ind.Length()];
        for (size_t i = 0; i < _ind.Length(); ++i) {
            if (!_ind.Get(i).IsNumber()) {
                Napi::TypeError::New(env, "Wrong type: Specify array of numbers as indexes").ThrowAsJavaScriptException();
                return env.Null();
            }
            ind[i] = _ind.Get(i).ToNumber().Uint32Value();
        }
    }
    else {
        Napi::TypeError::New(env, "Expected file name or array of Numbers").ThrowAsJavaScriptException();
        return env.Null();
    }
    double res = mae(table1, table2, ind, SIZE);
    if (info[0].IsString()) delete table1;
    if (info[1].IsString()) delete table2;
    delete ind;
    return Napi::Number::New(env, res);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "mae"), Napi::Function::New(env, MaeWrapper));
    exports.Set(Napi::String::New(env, "rmape"), Napi::Function::New(env, RmapeWrapper));
    exports.Set(Napi::String::New(env, "CSVBuff"), CSVBuff::GetClass(env));
    return exports;
}

NODE_API_MODULE(addon, Init)

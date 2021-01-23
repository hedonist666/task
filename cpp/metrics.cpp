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

    Napi::Value show(const Napi::CallbackInfo& info) {
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
            CSVBuff::InstanceMethod("show", &CSVBuff::show)
        });
    }
};


Napi::Value MaeWrapper(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }
    int *ind;
    unordered_map<int, double>* table1;
    unordered_map<int, double>* table2;
    if (info[0].IsString()) {
        table1 = new unordered_map<int, double>;
        read_data_csv(info[0].ToString(), table1);
    }
    else table1 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[0].As<Napi::Object>())->data;
    if (info[1].IsString()) {
        table2 = new unordered_map<int, double>;
        read_data_csv(info[1].ToString(), table2);
    }
    else table2 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[1].As<Napi::Object>())->data;
    ind = read_indexes(info[2].ToString());
    double res = mae(table1, table2, ind, SIZE);
    delete ind;
    if (info[0].IsString()) delete table1;
    if (info[1].IsString()) delete table2;
    return Napi::Number::New(env, res);
}

Napi::Value RmapeWrapper(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }
    int *ind;
    unordered_map<int, double>* table1;
    unordered_map<int, double>* table2;
    if (info[0].IsString()) {
        table1 = new unordered_map<int, double>;
        read_data_csv(info[0].ToString(), table1);
    }
    else table1 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[0].As<Napi::Object>())->data;
    if (info[1].IsString()) {
        table2 = new unordered_map<int, double>;
        read_data_csv(info[1].ToString(), table2);
    }
    else table2 = &Napi::ObjectWrap<CSVBuff>::Unwrap(info[1].As<Napi::Object>())->data;
    ind = read_indexes(info[2].ToString());
    double res = rmape(table1, table2, ind, SIZE);
    delete ind;
    if (info[0].IsString()) delete table1;
    if (info[1].IsString()) delete table2;
    return Napi::Number::New(env, res);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "mae"), Napi::Function::New(env, MaeWrapper));
    exports.Set(Napi::String::New(env, "rmape"), Napi::Function::New(env, RmapeWrapper));
    exports.Set(Napi::String::New(env, "CSVBuff"), CSVBuff::GetClass(env));
    return exports;
}

NODE_API_MODULE(addon, Init)

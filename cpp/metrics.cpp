#define NAPI_CPP_EXCEPTIONS
#include <napi.h>
#include "utils.h"

using namespace Napi;

int SIZE;
double mae(unordered_map<int, double> *y_true, unordered_map<int, double> *y_pred, int *ind, int size);
double rmape(unordered_map<int, double> *y_true, unordered_map<int, double> *y_pred, int *ind, int size);

Napi::Value MaeWrapper(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }
    int *ind;
    unordered_map<int, double> table1, table2;
    read_data_csv(info[0].ToString(), &table1);
    read_data_csv(info[1].ToString(), &table2);
    ind = read_indexes(info[2].ToString());
    double res = mae(&table1, &table2, ind, SIZE);
    delete ind, table1, table2;
    return Napi::Number::New(env, res);
}

Napi::Value RmapeWrapper(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 3) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return env.Null();
    }
    int *ind;
    unordered_map<int, double> table1, table2;
    read_data_csv(info[0].ToString(), &table1);
    read_data_csv(info[1].ToString(), &table2);
    ind = read_indexes(info[2].ToString());
    double res = rmape(&table1, &table2, ind, SIZE);
    delete ind, table1, table2;
    return Napi::Number::New(env, res);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "mae"), Napi::Function::New(env, MaeWrapper));
    exports.Set(Napi::String::New(env, "rmape"), Napi::Function::New(env, RmapeWrapper));
    return exports;
}

NODE_API_MODULE(addon, Init)

{
    "targets": [
        {
            "target_name": "metrics",
            "sources": ["cpp/metrics.cpp", "cpp/mae.cpp", "cpp/rmape.cpp", "cpp/utils.cpp"],
            "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"],
            "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
            "cflags!": [ '-fno-exceptions'  ],
            "cflags_cc!": [ '-fno-exceptions'  ],
        }
    ]
}

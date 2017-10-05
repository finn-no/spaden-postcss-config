'use strict';
const path = require('path');
let spadenPath;

// support as a dependency inside or aside to spaden
try {
    spadenPath = path.dirname(
        require.resolve('spaden/package.json')
    )
} catch(e) {
    spadenPath = path.dirname(
        path.resolve(__dirname, '..', '..', 'package.json')
    );
}

// exports all plugins to run when building
module.exports = function(config) {
    const input = {
        postcss: {
            path: [
                process.cwd(),
                path.resolve(
                    spadenPath, 'src', 'styles'
                )
            ]
        }
    };

    if (config && config.postcss) {
        // TODO when needed merge options
    }

    return [
        require('postcss-import')(input.postcss),
        require('postcss-custom-properties')(),
        require('postcss-mixins')(),
        // require('postcss-nested'),
        require('postcss-media-minmax')(),
        require('postcss-custom-media')(),
        require('autoprefixer')({ browsers: ['last 6 versions'] })
    ];
};

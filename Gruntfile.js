module.exports = function(grunt) {

  grunt.initConfig({
    uglify: {
      options: {
        mangle: false,
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapName: 'app/public/dist/js/bundle.min.js.map'
        },
        files: {
          'app/public/dist/js/bundle.min.js': [
            'app/public/assets/libs/angular/angular.min.js',
            'app/public/assets/libs/angular-route/angular-route.min.js',
            'app/public/assets/libs/angular-aria/angular-aria.min.js',
            'app/public/assets/libs/angular-animate/angular-animate.min.js',
            'app/public/assets/libs/angular-material/angular-material.min.js',
            'app/public/app.modules.js',
            'app/public/app.js',
            'app/public/shared/**/*.js',
            'app/public/sections/**/*.js'
            ]
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        sourceMap: true,
        report: 'min'
      },
      target: {
        files: {
          'app/public/dist/css/bundle.min.css': [
            'app/public/assets/libs/angular-material/angular-material.min.css',
            'app/public/assets/css/**/*.css'
            ]
        }
      }
    },
    connect: {
      dev: {
        options: {
          base: 'app/public/',
          livereload: true,
          port: 9000,
          hostname: 'localhost',
          keepalive: true,
          protocol: 'http'
        }
      }
    },
    express: {
      options: {
        background: true,
        port: 9000,
        debug: true
      },
      dev: {
        options: {
          script: 'app/server/server.js'
        }
      }
    },
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'app/server/*.js',
        'app/server/api/*.js',
        'app/server/models/*.js',
        'app/server/models/constants/*.js',
        'app/server/rest/*.js',
        'app/server/services/*.js',
        'app/server/token/*.js',
        'app/server/shared/*.js'
      ]
    },

    plato: {
      options: {
        exclude: /\.min\.js$/,
        jshint : grunt.file.readJSON('.jshintrc')
      },
      metrics: {
        files: {
          'reports': [
          'app/server/*.js',
          'app/server/api/*.js',
          'app/server/models/*.js',
          'app/server/models/constants/*.js',
          'app/server/rest/*.js',
          'app/server/services/*.js',
          'app/server/token/*.js',
          'app/server/shared/*.js'
          ]
        }
      }
    },

    shell: {
      openReportsDarwin: {
        command: 'open reports/index.html',
        options: {
          stdout: true
        }
      },
      openReportsWin: {
        command: 'start reports/index.html',
        options: {
          stdout: true
        }
      }
    },
    auto_install: {
    local: {},
      subdir: {
        options: {
          cwd: 'subdir',
          stdout: true,
          stderr: true,
          failOnError: true,
          npm: true,
          bower: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-plato');

  grunt.registerTask('s', [
    'auto_install', 
    'uglify:dev', 
    'cssmin', 
    'express:dev',
    'jshint'
    ]);

  grunt.registerTask('metrics:win', ['plato:metrics', 'shell:openReportsWin']);
  grunt.registerTask('metrics:darwin', ['plato:metrics', 'shell:openReportsDarwin']);
}

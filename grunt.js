/*global module:false*/
module.exports = function(grunt) {

  // Add mochaTest task
  grunt.loadNpmTasks('grunt-mocha-test');

  function getLintConfig() {
    return {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        es5: true
      },
      globals: {
      }
    };
  }
  
  function getNodeLintConfig() {
    var config = getLintConfig();
    config.options.node = true;
    return config;
  }

  function getNodeTestLintConfig() {
    var config = getNodeLintConfig();
    config.globals.describe = false;
    config.globals.it = false;
    config.globals.before = false;
    config.globals.after = false;
    return config;
  }

  // Project configuration.
  grunt.initConfig({
    lint: {
      node: ['grunt.js', 'src/**/*.js'],
      nodeTest: ['test/src/**/*.js', 'test/integration/**/*.js']
    },
    jshint: {
      node: getNodeLintConfig(),
      nodeTest: getNodeTestLintConfig()
    },
    mochaTest: {
      test: ['test/src/**/*.js', 'test/integration/**/*.js'],
      doc: ['test/src/**/*.js']
    },
    mochaTestConfig: {
      test: {
        options: {
          reporter: 'nyan'        
        }
      },
      doc: {
        options: {
          reporter: 'doc'        
        }
      }
    },
    watch: {
      scripts: {
        files: ['grunt.js', 'src/**/*.js', 'test/src/**/*.js', 'test/integration/**/*.js'],
        tasks: 'default'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint mochaTest:test');

  // Documentation task.
  grunt.registerTask('doc', 'mochaTest:doc');
};
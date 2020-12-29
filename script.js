$(function() {
    var files = [{
                name: "resume.pdf",
                contents: function() { term.error("Not an ascii file") },
                open: "./resume.pdf"
            }, {
                name: "email.txt",
                contents: function() { term.echo("crclark96@gmail.com") },
                open: "mailto:crclark96@gmail.com"
            }, {
                name: "github.txt",
                contents: function() { term.echo("https://github.com/crclark96") },
                open: "https://github.com/crclark96"
            }
    ];
    var commands = {
        help: help,
        echo: function(param) {
            this.echo(param);
        },
        ls: function() {
            files.forEach(file => term.echo(file.name) );
        },
        cat: function(filename) {
            var file = files.find(file => file.name == filename);
            if (undefined === file) {
                term.error("no such file " + filename);
            } else {
                file.contents();
            }
        },
        open: function(filename) {
            var file = files.find(file => file.name == filename);
            if (undefined === file) {
                term.error("no such file " + filename);
            } else {
                window.open(file.open, "_blank");
            }
        }
    }
    var term = $('#terminal').terminal(commands,
    {
        onInit: help,
        greetings: function() {},
        prompt: "#> ",
        completion: function(string, callback) {
            if (this.get_command().match(/^(ls )|(cat )|(open )/)) {
                callback(files.map(file => file.name));
            } else {
                callback(Object.keys(commands));
            }
        }
    });

    function help() {
         this.echo("try one of the following commands: " +
                   "[[b;#F0EDEE;]help] [[b;#F0EDEE;]ls] [[b;#F0EDEE;]echo] " +
                   "[[b;#F0EDEE;]cat] [[b;#F0EDEE;]open]");

    }
});



/*jshint undef:true, browser:true, noarg:true, curly:true, regexp:true, newcap:true, trailing:false, noempty:true, regexp:false, strict:true, evil:true, funcscope:true, iterator:true, loopfunc:true, multistr:true, boss:true, eqnull:true, eqeqeq:false, undef:true */
/*global $:false, console:false */

$(document).ready(function(){
    'use strict';
    /**
     * result
        741859362
        968327514
        352164798
        437596821
        689213475
        215748936
        823471659
        176985243
        594632187
        */
    // var sudo = [
    //     '7_1_5936_',
    //     '__8___5_4',
    //     '35___4___',
    //     '__75__8__',
    //     '_8_213_7_',
    //     '__5__89__',
    //     '___4___59',
    //     '1_6___2__',
    //     '_9463_1_7'
    // ],
    var sudo = [
        '7_1_5936_',
        '__8___5_4',
        '35___4___',
        '__75__8__',
        '_8_213_7_',
        '215__89__',
    //    '215748936',
        '823471659',
        '176985243',
        '594632187'
    ],
    answer = [],
    fixedLength = 0;

    for (var s = 0; s < 9; s++) {
        for (var k = 0; k < 9; k++) {
            if (sudo[s][k] !== '_') {
                answer.push([s, k]);
            }
        }
    }

    fixedLength = answer.length;
    for (s = 0; s < 9; s++) {
        for (k = 0; k < 9; k++) {
            if (sudo[s][k] === '_') {
                changeNum(s, k, 1);
                while (check(s, k) === false) {
                    if (sudo[s][k] === '9') {
                        var last = answer.pop();
                        changeNum(s, k, '_');
                        if (answer.length < fixedLength) {
                            s = k = 10;
                            console.log('no answer');
                            break;
                        }
                        s = last[0];
                        k = last[1];
                    }
                    changeNum(s, k);
                }
                if (sudo[s][k] !== '_') {
                    answer.push([s, k]);
                }
            }
            console.log(s+'|||'+k+'|||'+sudo[s][k]);
            debugger;
        }
    }

    console.log(answer);
    console.log(sudo);

    function changeNum (i, j, num) {
        var origin = sudo[i][j];
        if (!num) {
            num = ++origin;
        }
        sudo[i] = sudo[i].slice(0, j) + num + sudo[i].slice(j+1);
    }

    function check(i, j) {
        var n = sudo[i][j];
        if (sudo[i].split(n).length > 2) {
            return false;
        }
        var testLine = '';
        for (var a = 0; a < 9; a++) {
            testLine += sudo[a][j];
        }
        if (testLine.split(n).length > 2) {
            return false;
        }
        var dx = parseInt(i/3, 10),
            dy = parseInt(j/3, 10);
        testLine = '';
        for (var b = 0; b < 3; b++) {
            testLine += sudo[dx*3+b][dy*3];
            testLine += sudo[dx*3+b][dy*3+1];
            testLine += sudo[dx*3+b][dy*3+2];
        }
        if (testLine.split(n).length > 2) {
            return false;
        }

    }
});


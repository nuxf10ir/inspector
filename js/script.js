const $ = require('jquery');
const _ = require('lodash');
const gameData = require('./gamedata');

_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

$.fn.preload = function (callback) {
    var length = this.length;
    var iterator = 0;

    return this.each(function () {
        var tmp = new Image();

        if (callback)
            tmp.onload = function () {
                ++iterator;
                if (iterator === length) {
                    callback()
                }
            };

        tmp.src = this;
    });
};

_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

$.fn.cardGame = function() {
    var self = this,
        $card = $(this),
        questionsData = gameData.questionsData,
        answersData = gameData.answersData,
        score = 0,
        quizTmpl = _.template($("#quiz__tmpl").html()),
        answerTmpl = _.template($("#answer__tmpl").html()),
        finishTmpl = _.template($("#finish__tmpl").html());

    $card.on("click.cardGame", ".js-to-question", function(e) {
        var $this = $(e.currentTarget),
            questionId = $this.data("question");
        if (questionId === -1) {
            $card
                .remove("card-content__type-quiz")
                .addClass("card-content__type-start")
                .html(finishTmpl({result: score}));
        } else {
            $card.html(quizTmpl(_.extend(questionsData[questionId], {id: questionId})))
        }
    });

    $card.on("click.cardGame", ".js-to-answer", function(e) {
        var $this = $(e.currentTarget),
            questionId = $this.data("question"),
            answerId = $this.data("answer");
        answerScore = $this.data("score");
        score += parseInt(answerScore, 10);

        $card.html(answerTmpl(answersData[questionId][answerId]));
    });

    $card.on("click.cardGame", ".js-to-restart",  function() {
        init();
    });

    var init = function () {
        score = 0;
        $card
            .removeClass("card-content__type-start")
            .addClass("card-content__type-quiz")
            .html(quizTmpl(_.extend(questionsData[1], {id: 1})));
    };

    return {
        init: init
    };


};

$(document).ready(function() {
    $([
        'i/back.png',
        'i/baloon.png',
        'i/inspector.png',
        'i/start.png'
    ])
        .preload(function(perc, done) {
            var startTmpl = _.template($("#start__tmpl").html());
            $("#card")
                .removeClass("card-content__type-loader")
                .addClass("card-content__type-start")
                .html(startTmpl());
            $("#start-button")
                .one("click.cardGame", function(e) {
                    $("#card").cardGame().init();
                });

        });
});










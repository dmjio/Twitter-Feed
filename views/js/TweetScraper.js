// Define the model

$(document).ready(function() { 

  $("#loader").hide().ajaxStart(function() { console.log("showing load..."); this.show(); }).ajaxStop(function() { console.log("showing load..."); this.hide();});

Tweet = Backbone.Model.extend();

// Define the collection
Tweets = Backbone.Collection.extend(
    {
        model: Tweet,
        // Url to request when fetch() is called
        url: 'http://search.twitter.com/search.json?q=narrativesci',

        parse: function(response) {

            //modify dates to be more readable
            $.each(response.results, function(i,val) {
                val.created_at = val.created_at.slice(0, val.created_at.length - 6);
              });

            return response.results;
        },
        // Overwrite the sync method to pass over the Same Origin Policy
        sync: function(method, model, options) {
            var that = this;
                var params = _.extend({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: that.url,
                    processData: true
                }, options);

            return $.ajax(params);
        },
        comparator: function(activity){

            var date = new Date(activity.get('created_at'));
            return -date.getTime();

        }
    });

// Define the View
TweetsView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      // create a collection
      this.collection = new Tweets;
      // Fetch the collection and call render() method
      var that = this;
      this.collection.fetch({
        success: function (s) {
            console.log("fetched", s);
            that.render();
        }
      });
    },

    el: $('#tweetContainer'),
    // Use an external template

    template: _.template($('#tweettemplate').html()),

    render: function() {
        // Fill the html with the template and the collection
        $(this.el).html(this.template({ tweets: this.collection.toJSON() }));
    },

    events : {
        'click .refresh' : 'refresh',
        'click .reverse' : 'reverse'
    },

    refresh : function() {

     this.collection.fetch();
    console.log('refresh', this.collection);
     this.render();

    },

    reverse : function() {

        var $ref = $(".notifyRefresh");

        console.log("you clicked reverse");
       
        console.log(this.collection, "collection");

        this.collection.sort();
    }

});

var app = new TweetsView();
});
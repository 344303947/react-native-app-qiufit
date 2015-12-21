/**
 * Created by guguyanhua on 12/8/15.
 */
var Reflux = require('reflux');
var Actions = require('../actions/VideoActionCreators');
var API = require('../api');
import moment from 'moment';
//var _ = require('lodash');


var CommentStore = Reflux.createStore({
  listenables: Actions,
  //FIXME 分页没做
  pullNextComment:function(){
    API.getComment(this.ref.type, this.ref.step,0,20,function(results){
      for (var i = 0; i < results.length; i++) {
        var data = results[i];
        var user = data.get('user');
        var date = data.get('date');
        var comment = data.get('comment');
        this.comments.push({
          nickname:user.get('username'),
          time:moment(date).format('YYYY-MM-DD'),
          commentContent:comment
        });
      }
      this.trigger(this);
    }.bind(this),function(error){

    })
  },
  post: function(comment){
    API.postComment(this.ref.type, this.ref.step,comment);
  },
  finishTurning: function () {
    API.finishTurning(this.ref.type, this.ref.step);
  },
  fetchComments: function () {

  },
  setRef: function (ref) {
    this.ref = ref;
    this.trigger(this);
  },
  getInitialState: function () {
    this.comments = this.comments || [];
    //this.type = this.type || '';
    //this.step = this.step || '';
    this.ref = this.ref || {};
    return {
      comments: this.comments,
      //type: this.type,
      //step: this.step,
      ref: this.ref,
    };
  },
  reset(){

  }

});

module.exports = CommentStore;

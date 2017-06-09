
ChatBotApp.controller('ChatController', ['$scope', '$sce' ,'$http', '$timeout', '$interval', '$q', function ($scope, $sce,$http, $timeout, $interval, $q) {
    var vm = this;
    /* Time */

    var deviceTime = document.querySelector('.status-bar .time');
    var messageTime = document.querySelectorAll('.message .time');

    deviceTime.innerHTML = moment().format('h:mm');

    setInterval(function() {
        deviceTime.innerHTML = moment().format('h:mm');
    }, 1000);

    for (var i = 0; i < messageTime.length; i++) {
        messageTime[i].innerHTML = moment().format('h:mm A');
    }

    /* Message */

    var form = document.querySelector('.conversation-compose');
    var conversation = document.querySelector('.conversation-container');
    var today = new Date().valueOf()

    vm.initial = function(){
                    $http.get("https://trim-mode-139918.firebaseio.com/.json?print=pretty").then(function(response){

                            vm.listMessage = Object.keys(response.data.mensajes.mensajes).map(function(key) {
                                                return response.data.mensajes.mensajes[key]
                            })


                    })


    }
    vm.online = function(){
        return navigator.onLine?true:false;
    }
    vm.newMessage = function(input) {
        if (input.value) {
            //var message = vm.buildMessage(input.value);
            //conversation.appendChild(message);
            //vm.animateMessage(message);
            var date = new Date().valueOf()
            data = {usertype:"sent",text:input.value,sending:true, date:date}
            if(vm.online()){
                vm.listMessage.push(data)

            }else{
                data.sending = false
                vm.listMessage.push(data)
            }
            index = vm.listMessage.indexOf(data)
            $http.post("https://trim-mode-139918.firebaseio.com/mensajes/mensajes.json",{params: data}).then(function(response){
                            console.log("siiii!!")


            },function(res){
                console.log("Nooo!!")
            })
        input.value = '';
        conversation.scrollTop = conversation.scrollHeight;
        }
    }

    vm.newMessageKey = function(event){
        if (event.which == 13 && !event.shiftKey) {
            $timeout(function () {
               vm.newMessage(event.target)

            },1)
        }

    }
    vm.getMessages = function(){
        return vm.listMessage

    }

    vm.buildMessage = function (text) {
        var element = document.createElement('div');

        element.classList.add('message', 'sent');
        if(vm.online()){


            element.innerHTML = text +
                '<span class="metadata">' +
                    '<span class="time">' + moment().format('h:mm A') + '</span>' +
                    '<span class="tick tick-animation">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
                    '</span>' +
                '</span>';
        }else{
            element.innerHTML = text +
                '<span class="metadata">' +
                    '<span class="time">' + moment().format('h:mm A') + '</span>' +
                    '<span class="tick tick-animation">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#F44336"/></svg>' +
                    '</span>' +
                '</span>';


        }

        return element;
    }

    vm.animateMessage = function(message) {
        setTimeout(function() {
            var tick = message.querySelector('.tick');
            tick.classList.remove('tick-animation');
        }, 500);
    }
    vm.initial()
}])
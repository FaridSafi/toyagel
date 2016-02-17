var React = require('react-native');
var {
    LinkingIOS,
    Platform,
    ActionSheetIOS,
    Dimensions,
    View,
    Text
    } = React;

var GiftedMessenger = require('react-native-gifted-messenger');
var Communications = require('react-native-communications');
var Parse = require('parse/react-native');


var GiftedMessengerExample = React.createClass({
    getInitialState: function () {
        return {
            greeting: 'Salam',
            date: new Date(),
            errorMessage: '',
            user: null,
            artistId: '',
            olderMessageTextFrom: [],
            olderMessageTextTo: [],
            olderMessageDateFrom: [],
            olderMessageDateTo: [],
            earlierMessages: []


        }
    },
    componentWillMount: function () {
        Parse.User.currentAsync().then((user) => {
                this.setState({user: user})
            }
        )
    },
    /*   getArtist: function () {
     var User = Parse.Object.extend('User');
     var artist = new User();
     var query = new Parse.Query(User);
     query.equalTo('username', 'bilbil');
     query.first({
     success: (results) => {
     this.setState({artistName: results.get('name')});
     this.setState({artistId: artist.id});
     console.log(results);
     },
     error: (data, error) => {
     this.setState({errorMessage: error.message});
     }
     });
     //return this.state.artistName
     },*/

    getMessages() {
        return [
            {
                text: this.state.greeting,
                name: 'Bilbil Owezowa',
                image: require('../common/images/bilbil_owezowa.png'),
                position: 'left',
                date: new Date()
                //messageId: this.state.artistId + date
            },
            {
                text: "Bos gununiz bar my ?",
                name: this.state.user,
                image: null,
                position: 'right',
                date: new Date()
                //If needed, you can add others data (eg: userId, messageId)
            },
        ];
    },

    handleSend(message = {}, rowID = null) {
        // Your logic here
        // Send message.text to your server
        var Message = Parse.Object.extend('Message');
        var chat = new Message();
        chat.set('message', message.text);
        chat.set('from', this.state.user.id);
        chat.set('to', "6yCeF80qWf");
        chat.save(null, {
            success: (chat) => {
                this.setState(older);
                console.log('Message saved :' + message.text)
            },
            error: (chat, error) => {
                console.log(error.message)
            }
        });

        this._GiftedMessenger.setMessageStatus('Sent', rowID);
        this._GiftedMessenger.setMessageStatus('Seen', rowID);
        this._GiftedMessenger.setMessageStatus('Custom label status', rowID);
        this._GiftedMessenger.setMessageStatus('ErrorButton', rowID); // => In this case, you need also to set onErrorButtonPress
    },

    // @oldestMessage is the oldest message already added to the list
    onLoadEarlierMessages(oldestMessage = {}, callback = () => {
    }) {

        var earlierMessages = []

        // Your logic here
        // Eg: Retrieve old messages from your server

        var Message = Parse.Object.extend('Message');
        var queryFrom = new Parse.Query(Message);
        //query.equalTo('from', this.state.user.id);

        queryFrom.equalTo('from', 'pnLutiFVZy'); // from salam
        queryFrom.equalTo('to', '6yCeF80qWf'); // to bagsy
        queryFrom.descending('createdAt');
        queryFrom.limit(100);
        queryFrom.find({
            success: (result) => {
                for (var i = 0; i , result.length; i++) {
                    this.setState({olderMessageTextFrom: result[i].get('message')});
                    this.setState({olderMessageDateFrom: result[i].get('createdAt')});
                    console.log('Messages ' + this.state.olderMessageTextFrom + '\n' + this.state.olderMessageDateFrom);


                    earlierMessages.push({
                            text: this.state.olderMessageTextFrom,
                            name: 'Hossar',
                            image: null,
                            position: 'right',
                            date: this.state.olderMessageDateFrom
                        }
                    );

                }
            },
            error: (data, error) => {
                console.log('Error occurred : ' + error.message)
            }
        });

        var queryTo = new Parse.Query(Message);

        queryTo.equalTo('from', '6yCeF80qWf');
        queryTo.equalTo('to', 'pnLutiFVZy');
        queryTo.descending('createdAt');
        queryTo.limit(100);
        queryTo.find({
            success: (result) => {
                for (var i = 0; i < result.length; i++) {
                    this.setState({olderMessageTextTo: result[i].get('message')});
                    this.setState({olderMessageDateTo: result[i].get('createdAt')});

                    earlierMessages.push({
                            text: this.state.olderMessageTextTo,
                            name: 'Bilbil',
                            image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
                            position: 'left',
                            date: this.state.olderMessageDateTo
                        }
                    );

                }
            },
            error: (data, error) => {
                console.log('Error occurred : ' + error.message)
            }
        });

        setTimeout(() => {
            callback(earlierMessages, false); // when second parameter is true, the "Load earlier messages" button will be hidden
        }, 1000);
    },

    handleReceive(message = {}) {
        this._GiftedMessenger.appendMessage(message);
    },

    onErrorButtonPress(message = {}, rowID = null) {
        // Your logic here
        // Eg: Re-send the message to your server

        setTimeout(() => {
            // will set the message to a custom status 'Sent' (you can replace 'Sent' by what you want - it will be displayed under the row)
            this._GiftedMessenger.setMessageStatus('Sent', rowID);
            setTimeout(() => {
                // will set the message to a custom status 'Seen' (you can replace 'Seen' by what you want - it will be displayed under the row)
                this._GiftedMessenger.setMessageStatus('Seen', rowID);
                setTimeout(() => {
                    // append an answer
                    this.handleReceive({
                        text: 'I saw your message',
                        name: 'React-Native',
                        image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
                        position: 'left',
                        date: new Date()
                    });
                }, 500);
            }, 1000);
        }, 500);
    },

    // will be triggered when the Image of a row is touched
    onImagePress(rowData = {}, rowID = null) {
        // Your logic here
        // Eg: Navigate to the user profile
    },

    render() {
        return (
            <GiftedMessenger
                ref={(c) => this._GiftedMessenger = c}

                styles={{
          bubbleRight: {
            marginLeft: 70,
            backgroundColor: '#007aff',
          },
        }}

                autoFocus={false}
                messages={this.getMessages()}
                handleSend={this.handleSend}
                onErrorButtonPress={this.onErrorButtonPress}
                maxHeight={Dimensions.get('window').height - navBarHeight - statusBarHeight}
                loadEarlierMessagesButton={true}
                onLoadEarlierMessages={this.onLoadEarlierMessages}

                senderName='Developer'
                senderImage={null}
                onImagePress={this.onImagePress}
                displayNames={true}

                parseText={true} // enable handlePhonePress and handleUrlPress
                handlePhonePress={this.handlePhonePress}
                handleUrlPress={this.handleUrlPress}
                handleEmailPress={this.handleEmailPress}

                inverted={true}
                />

        );
    },

    handleUrlPress(url) {
        if (Platform.OS !== 'android') {
            LinkingIOS.openURL(url);
        }
    },

    handlePhonePress(phone) {
        if (Platform.OS !== 'android') {
            var BUTTONS = [
                'Text message',
                'Call',
                'Cancel',
            ];
            var CANCEL_INDEX = 2;

            ActionSheetIOS.showActionSheetWithOptions({
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX
                },
                (buttonIndex) => {
                    switch (buttonIndex) {
                        case 0:
                            Communications.phonecall(phone, true);
                            break;
                        case 1:
                            Communications.text(phone);
                            break;
                    }
                });
        }
    },

    handleEmailPress(email) {
        Communications.email(email, null, null, null, null);
    },
});

var navBarHeight = (Platform.OS === 'android' ? 56 : 64);
// warning: height of android statusbar depends of the resolution of the device
// http://stackoverflow.com/questions/3407256/height-of-status-bar-in-android
// @todo check Navigator.NavigationBar.Styles.General.NavBarHeight
var statusBarHeight = (Platform.OS === 'android' ? 25 : 0);


module.exports = GiftedMessengerExample;

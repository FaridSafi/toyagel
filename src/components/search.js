var React = require('react-native');
var {
    View,
    Text,
    TextInput,
    Platform,
    StyleSheet,
    Image
    } = React;
var CalendarPicker = require('react-native-calendar-picker');
var Parse = require('parse/react-native');
var Button = require('../common/button');
var Messenger = require('./Messenger');
var ResponsiveImage = require('react-native-responsive-image');


var Search = React.createClass({
        getDefaultProps: function () {
            return {
                date: new Date(),
                singerName:''
            };
        },
        getInitialState: function () {
            return {
                date: this.props.date,
                artistName: '',
                artistUserId: 1,
                maxNoArtist: 0,
                imagePath: '../common/images/1.png',
                user: null
            }
        },
        componentWillMount: function () {
            Parse.User.currentAsync().then((user) => {
                this.setState({user: user});
            });

            this.getArtistName();
            this.getMaxNoArtist();
        },
        getMaxNoArtist: function () {
            var query = new Parse.Query(Parse.User);
            query.equalTo('userType', 'artist');
            query.count({
                success: (outcome)=> {
                    this.setState({maxNoArtist: outcome});
                    console.log('Maximum number of Artist : ' + this.state.maxNoArtist);
                },
                error: (data, error)=> {
                    console.log('Could not retrieve maximum number of artists : ' + error.message())
                }
            });
        }
        ,
        getArtistName: function () {
            var artist = [];
            var query = new Parse.Query(Parse.User);
            query.equalTo('userId', this.state.artistUserId);
            return query.first({
                success: (result) => {
                    this.setState({artistName: result.get('name')});
                    console.log('Singer name : '+this.singerName);
                    this.setState({imagePath: result.get('image').url()});
                },
                error: (data, error) => {
                    console.log('Error occured : ' + error.message())
                }
            });
        },

        getNextArtistName: function () {
            if (this.state.artistUserId > 0 && this.state.artistUserId < this.state.maxNoArtist) {
                this.setState({artistUserId: this.state.artistUserId + 1});
                this.getArtistName();
            } else {
                console.log('Reached maximum number of artist entry');
            }
        },

        getPreviousArtistName: function () {
            if (this.state.artistUserId > 1) {
                console.log("Number : " + this.state.artistUserId);
                this.setState({artistUserId: this.state.artistUserId - 1});
                this.getArtistName();
            } else {
                console.log('Reached to first artist !!!');
            }
        },
        artistInfo: function () {
            var artist = [];
            artist.push({
                name: this.state.artistName,
                id: this.state.artistUserId,
                image: this.state.imagePath,
                bookedDates: new Date()
            });

        },

        onDateChange: function (date) {
            this.setState({date: date});
        },
        render: function () {
            if (!this.state.user) {
                return <View style={styles.container}>
                    <Text style={styles.label}> Loading.... </Text>
                </View>
            }
            var username = this.state.user.get('username');


            return (
                    <View style={styles.container}>

                    <ResponsiveImage source={{uri:this.state.imagePath}} initHeight="200" initWidth="400"/>


                    <Text style={styles.label}>
                        {this.state.artistName}
                    </Text>

                    <View style={styles.innerButtonView}>
                        <Button text={'Onki'} onPress={this.getPreviousArtistName}/>
                        <Button text={'Indiki'} onPress={this.getNextArtistName}/>
                    </View>

                    <CalendarPicker
                        selectedDate={this.state.date}
                        onDateChange={this.onDateChange}
                        />

                    <View style={styles.innerButtonView}>
                        <Button text={'Cyk'} onPress={this.onLogoutPress}/>
                        <Button text={'Habarlas'} onPress={this.onPress}/>
                    </View>

                </View>


            );
        },
        onLogoutPress: function () {
            //Parse.User.logOut();
            console.log('I reached here !!!')
            this.props.navigator.immediatelyResetRouteStack([{name: 'signin'}]);
        },
        onPress: function () {
            this.props.navigator.push({name: 'messenger'});
        }
    })
    ;

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    label: {
        fontSize: 18
    },
    imageHolder: {
        height: 200,
        width: 200
    },
    contact: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop: 10
    },
    availableDates: {
        color: 'green'
    },
    nextPreviousButton: {
        width: 20
    },
    innerButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    }

});

module.exports = Search;
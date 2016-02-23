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
var ResponsiveImage = require('react-native-responsive-image');


var Search = React.createClass({
        getDefaultProps: function () {
            return {
                date: new Date()
            };
        },
        getInitialState: function () {
            return {
                date: this.props.date,
                artistName: '',
                artistUserId: 1,
                imagePath: '../common/images/1.png',
                user: null
            }
        },
        componentWillMount: function () {
            Parse.User.currentAsync().then((user) => {
                this.setState({user: user});
            });

            this.getArtistName();
        },
        getArtistName: function () {
            var count = this.state.artistUserId;
            var query = new Parse.Query(Parse.User);
            query.equalTo('userId', count);
            return query.first({
                success: (result) => {
                    this.setState({artistName: result.get('name')});
                    this.setState({imagePath: result.get('image')});
                    console.log("Image path  : " + this.state.imagePath);
                },
                error: (data, error) => {
                    console.log('Error occured : ' + error.message())
                }
            });
        },

        getNextArtistName: function () {
            if (this.state.artistUserId > 0 && this.state.artistUserId < 3) {
                this.setState({artistUserId: this.state.artistUserId + 1});
                this.getArtistName();
            } else {
                console.log('Reached maximum number of artist entry');
            }
        },

        getPreviousArtistName: function () {
            if (this.state.artistUserId > 1 && this.state.artistUserId < 3) {
                console.log("Number : " + this.state.artistUserId);
                this.setState({artistUserId: this.state.artistUserId - 1});
            } else {
                console.log('Reached to first artist !!!');
                console.log("Number : " + this.state.artistUserId);
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
            var imageFile = this.state.imagePath;
            var imageURL = imageFile.url();

            return (
                <View style={styles.container}>


                    <ResponsiveImage source={{uri:imageURL}} initHeight="200" initWidth="400"/>


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
import React, {Component} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

export class Splash extends Component {
  render() {
    return (
      <Onboarding
        onDone={() => this.props.navigation.replace('Login')}
        onSkip={() => this.props.navigation.replace('Login')}
        pages={[
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../Assets/lotteView/23997-ecoleta.json')}
                autoPlay={true}
              />
            ),
            title: 'Pilah Sampah',
            subtitle:
              'Letakan Sampah Pada Kategori Yang Sesuai Dengan Tempatnya',
          },
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../Assets/lotteView/30323-cycling.json')}
                autoPlay={true}
              />
            ),
            title: 'Hidup Sehat',
            subtitle: 'Lingkungan Indah dan Bersih Membuat Kita Nyaman',
          },
          {
            backgroundColor: '#ffff',
            image: (
              <LottieView
                style={{
                  width: 350,
                  height: 350,
                }}
                source={require('../../Assets/lotteView/4261-cash-money-euro.json')}
                autoPlay={true}
              />
            ),
            title: 'Pemasukan',
            subtitle: 'Cara Mudah Mendapatkan Penghasilan',
          },
        ]}
      />
    );
  }
}

export default Splash;

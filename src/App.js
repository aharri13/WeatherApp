import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Flex,
  Input,
  theme,
  Heading,
  Spacer,
  Text,
  Box,
  Icon,
  Image,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { 
  FaCloudSun,
  FaTachometerAlt,
 } from 'react-icons/fa';
import {
  WiHorizon,
  WiDaySunny, 
  WiThermometer,
  WiStrongWind,
  WiDirectionDown,
  WiDirectionUp,
  WiHumidity,
} from 'react-icons/wi';


const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=95cf082faadb2aaf5205528659537c8b`;

  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => setWeatherData(data));
  }, [url]);

  const dt = weatherData.dt ? weatherData.dt : null;
  const timezone = weatherData.timezone ? weatherData.timezone : null;
  const sunrise = weatherData.sys ? weatherData.sys.sunrise : null;
  const sunset = weatherData.sys ? weatherData.sys.sunset : null

 
  
  function getDate(dt, timezone) {
    const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utc_milliseconds = utc_seconds * 1000;
    const local_date = new Date(utc_milliseconds).toUTCString();
    return local_date;
  }

  function getSunriseSunset(dt, timezone) {
    const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utc_milliseconds = utc_seconds * 1000;
    const local_date = new Date(utc_milliseconds).toUTCString();
    const hour = new Date(local_date).getUTCHours();
    const formattedHour = hour > 12 ? hour - 12 : hour;
    const minute = new Date(local_date).getUTCMinutes();
    const formattedMinute = minute < 10 ? '0' + minute : minute;
    const sunrise_sunset = formattedHour + ":" + formattedMinute;
    return sunrise_sunset;
  }

  return (
    <ChakraProvider theme={theme}>
      <Flex mt='1%' ml='2%'mr='2%'>
        <Icon as={FaCloudSun ? FaCloudSun : null} boxSize={8} />
        <Heading as='h4' size='lg'>Weather App</Heading>
        <Spacer />
      <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      <>
      <Box align='center'mt='5%' maxW='4xl' ml='20%' 
      variant='outline' borderRadius='lg'bg={'blue.600'}>
        <Flex mt='2%' width='75%'>
         <Input value={location} onChange={e => setLocation(e.target.value)} w='100%' placeholder='Search Location'
         variant='filled' mt='5%'/>
        </Flex>

        <Heading  size='lg' mt='5%'>{getDate(dt, timezone)}</Heading>
        <Flex flexDir='column' mt='10%' width={'75%'}>
          <Heading size='lg'>{weatherData.name}, {weatherData.sys ? weatherData.sys.country : null}</Heading>
          <Text fontSize='lg' color={'blue.200'}>{weatherData.weather ? weatherData.weather[0].description : null}</Text>
          <Flex flexDir={'row'} mt='5%'>
          <Image src={`https://openweathermap.org/img/wn/${weatherData.weather ? weatherData.weather[0].icon : null}.png`}
          boxSize={'100px'} alignSelf={'left'} mt={'5%'}/>
          <Heading size='2xl' mt={'5%'} ml={'25%'} alignSelf={'center'}>{weatherData.main ? (weatherData.main.temp * 9/5 - 459.67).toFixed(): null}°F</Heading>
          <Flex flexDir={'column'} mt='5%' ml='20%'>
            <Flex flexDir='row'>
              <Icon as={WiThermometer} mt='2%' boxSize={6}/>
              <Text fontSize='md'>Feels Like: {weatherData.main ? (weatherData.main.feels_like * 9/5 - 459.67).toFixed() : null}°F</Text>
            </Flex>
            <Flex flexDir={'row'}>
              <Icon as={WiHumidity} boxSize={6} mt='2%'/>
              <Text fontSize='md'>Humidity: {weatherData.main ? weatherData.main.humidity : null}%</Text>
            </Flex>
            <Flex flexDir={'row'}>
              <Icon as={WiStrongWind} boxSize={6} mt='2%'/>
              <Text fontSize='md' ml='1%'>Wind: {weatherData.wind ? (weatherData.wind.speed * 1.609344).toFixed() : null}MPH</Text>
            </Flex>
            <Flex>
              <Flex flexDir={'row'}>
              <Icon as={FaTachometerAlt} boxSize={4} mt={1}/>
              <Text fontSize='md' ml={1}>Pressure: {weatherData.main ? (weatherData.main.pressure * 0.02952998057228486).toFixed() : null} inHg</Text>
              </Flex>
            </Flex>
          </Flex>
          </Flex>
        </Flex>

        <Flex flexDir='row' width={'75%'} mt='2%'>
          <Icon as={WiDaySunny} boxSize={6}/>
          <Text fontSize='md'>Sunrise: {getSunriseSunset(sunrise, timezone)}AM</Text>
          <Spacer />
          <Icon as={WiHorizon} boxSize={6} />
          <Text fontSize='md'>Sunset: {getSunriseSunset(sunset, timezone)}PM</Text>
          <Spacer />
          <Icon as={WiDirectionUp} boxSize={6} />
          <Text fontSize='md'>High: {weatherData.main ? (weatherData.main.temp_max * 9/5 - 459.67).toFixed() : null}°F</Text>
          <Spacer />
          <Icon as={WiDirectionDown} boxSize={7} />
          <Text fontSize='md'>Low: {weatherData.main ? (weatherData.main.temp_min * 9/5 - 459.67).toFixed() : null}°F</Text>
        </Flex>
      </Box>
      </>
    </ChakraProvider>
  );
}

export default App;

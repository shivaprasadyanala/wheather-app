window.addEventListener('load',()=>{
    let long;
    let lat;

    let tempdeg= document.getElementsByClassName('temperature-degree')[0]
    let description = document.getElementsByClassName('temperature-description')[0]
    let location = document.getElementsByClassName('location-timezone')[0]
    let weatherIcon = document.getElementsByClassName('icon')[0]
    
    
    // console.log(location)

    // console.log(description);
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=17.3764&lon=78.5579&units=Imperial&exclude=minutely&appid=3f7074e9bd977fa42d82638b27b4560b`
            fetch(api)
            .then(data=>{
                return data.json()
            })
            .then(data=>{
                // console.log(data.timezone);

                description.innerHTML = data.current.weather[0].description;
                // console.log(data.current.weather[0].description);
                const {temp} = data.current;


                tempdeg.innerHTML = temp;
                
                let celcious = (temp-32)/1.8;
                // console.log(celcious);
                location.innerHTML = data.timezone;
                
                let icon = data.current.weather[0].icon;
                // icon = "11d"
                console.log(data.current.weather[0].icon);

                let imgLink = `http://openweathermap.org/img/wn/${icon}@2x.png`;


                weatherIcon.childNodes[0].setAttribute("src",imgLink); 


                const symbol = document.getElementById('dist');

                


                tempdeg.addEventListener('click',()=>{
                    if(symbol.innerHTML === 'F'){
                        tempdeg.innerHTML = Math.floor(celcious);
                        symbol.innerHTML = "C"
                    }else{
                        tempdeg.innerHTML = temp;
                       symbol.innerHTML = "F";
                    }
                    
                })

                // tempdeg.addEventListener('click',()=>{
                //     tempdeg.innerHTML = temp;
                //     const symbol = document.getElementsByTagName('span')[0]
                //     symbol.innerHTML = 'F';
                // })

                // setIcons(icon,document.getElementsByClassName('icon'))


            })
            
        })
    
    }
     

    function setIcons(icon,iconId) {
        const skycons = new Skycons({color:"white"});
        // const currentIcon = icon.replace(/-/g,'_').toUpperCase();
        // const currentIcon  = "PARTLY_CLOUDY_DAY";
        skycons.play();
        return skycons.set(iconId,Skycons.PARTLY_CLOUDY_NIGHT)
    }
})
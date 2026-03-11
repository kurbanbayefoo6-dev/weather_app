import './App.css'
// Asosiy ob-havo komponenti
import Weather from './Components/WeatherApi/Weather'

function App() {
	return (
		// Ilovaning eng tashqi qismi (faqat bitta komponent chaqiriladi)
		<div>
			<Weather />
		</div>
	)
}

export default App

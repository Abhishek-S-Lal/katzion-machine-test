import AllRoutes from './routes/AllRoutes'
import { Provider } from 'react-redux'
import store from './redux/store'
import "./App.scss"

function App () {
  return (
    <div className='App'>
      <Provider store={store}>
        <AllRoutes />
      </Provider>
    </div>
  )
}

export default App

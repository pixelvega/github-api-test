import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// views
import App from 'components/pages/App/App';
import Unknown from 'components/pages/Unknown/Unknown';


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App}></Route>
        <Route path="" component={Unknown}></Route>
      </Switch>
    </Router>
  )
}

export default Routes;
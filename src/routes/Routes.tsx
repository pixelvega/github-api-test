import {
  Route,
  Switch
} from 'react-router-dom';

// views
import Unknown from 'components/pages/Unknown/Unknown';
import Home from 'components/pages/Home/Home';
import TableResults from 'components/blocks/TableResults/TableResults';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/search" component={TableResults}></Route>
      <Route path="" component={Unknown}></Route>
    </Switch>
  )
}

export default Routes;
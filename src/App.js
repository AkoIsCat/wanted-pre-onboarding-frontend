import Home from './page/Home';
import { Route, Routes } from 'react-router';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Todo from './page/Todo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;

import './App.css';
// import SymptomsChecker from './components/SymptomsChecker';
import WithModel from './components/WithModel';

function App() {
  return (
    <div className='relative'>
      <div className='absolute top-1 left-1 lg:top-4 lg:left-6 shadow-md cursor-pointer border-b-2 border-green-800'>
        <h1 className='text-sm lg:text-xl font-mono tracking-wide text-green-950 drop-shadow bg-white px-3 py-1'>Check Yourself</h1>
      </div>
      {/* <SymptomsChecker /> */}
      <WithModel />
      <footer className='absolute bottom-1 right-1 lg:bottom-4 lg:right-6'><p className='text-sm lg:text-base font-mono tracking-wide text-green-950 drop-shadow'>made by vaibhav and internet.</p></footer>
    </div>
  );
}

export default App;

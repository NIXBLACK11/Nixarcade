import { Navbar } from '../components/Navbar';
import { Home } from '../components/Home';
import { Contribute } from '../components/Contribute';

const Landing = () => {
  return (
    <div className="bg-custom-dark">
        <Navbar/> 
        <section id="Home" className='w-screen m-0 p-0'>
            <Home/>
        </section>
        <section id="Contribute" className='w-screen m-0 p-0'>
            <Contribute/>
        </section>
    </div>
  );
};

export default Landing;
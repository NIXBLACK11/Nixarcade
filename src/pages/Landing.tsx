import { Navbar } from '../components/Navbar';
import { Home } from '../components/Home';

const Landing = () => {
  return (
    <div className="bg-custom-dark">
        <Navbar/> 
        <section id="Home" className='w-screen m-0 p-0'>
            <Home/>
        </section>
    </div>
  );
};

export default Landing;
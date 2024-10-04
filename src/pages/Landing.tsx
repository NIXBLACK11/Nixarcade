import { Navbar } from '../components/Navbar';
import { Home } from '../components/Home';
<<<<<<< HEAD
=======
import { Games } from '../components/Games';
>>>>>>> ed2a81fbf23884c6c66cb0313047d3f44d65e677
import { Contribute } from '../components/Contribute';

const Landing = () => {
  return (
    <div className="bg-custom-dark">
        <Navbar/> 
        <section id="Home" className='w-screen m-0 p-0'>
            <Home/>
        </section>
<<<<<<< HEAD
=======
        <section id="Games" className='w-screen m-0 p-0'>
            <Games/>
        </section>
>>>>>>> ed2a81fbf23884c6c66cb0313047d3f44d65e677
        <section id="Contribute" className='w-screen m-0 p-0'>
            <Contribute/>
        </section>
    </div>
  );
};

export default Landing;
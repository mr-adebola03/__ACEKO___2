import React from 'react';
import { motion } from 'framer-motion';
import image from '../assets/doc.jpg';
import { FaUserMd, FaLaptopMedical, FaShieldAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; 
import userlogo from '../assets/doc.jpg'
import doc from '../assets/doc-header-img.png'

function Home() {
  const navigate = useNavigate()
  return (
//     <main className="w-full">
   
//       <section
//         className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white px-4"
//         style={{
//           backgroundImage: `url(${image})`,
//         }}
//       >
//         <motion.h1
//           className="text-5xl font-bold text-center mb-6 drop-shadow-xl"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           SUIVI MÉDICAL DES <br />
//           <strong>PATIENTS ATTEINTS DE MRC</strong>
//         </motion.h1>

//         <p className="text-center max-w-2xl text-lg drop-shadow-lg">
//           Améliorez la prise en charge des maladies rénales grâce à notre plateforme médicale intelligente et humaine.
//         </p>

//         <Link to="/rdv">
//   <button className="mt-8 px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:bg-blue-100 transition">
//     Créer un rendez-vous
//   </button>
// </Link>
//       </section>

      
//       <section className="py-16 px-6 bg-slate-50 text-center">
//         <h2 className="text-3xl font-bold text-blue-800 mb-4">Notre Mission</h2>
//         <p className="max-w-3xl mx-auto text-gray-600 text-lg">
//         Facilitez la gestion des dossiers médicaux des patients atteints de MRC avec une solution digitale sécurisée et évolutive.
//         </p>
//       </section>

//       <section className="py-16 px-6 bg-white">
//   <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Nos Services</h2>
//   <div className="flex flex-col md:flex-row justify-center items-center gap-10 max-w-5xl mx-auto">
    
//     {/* Service 1: Interface intuitive */}
//     <div className="flex flex-col items-center text-center">
//       <FaUserMd className="text-4xl text-blue-600 mb-2" />
//       <h3 className="text-xl font-semibold mb-2">Interface Intuitive</h3>
//       <p className="text-gray-600 max-w-xs">
//         Une interface simplifiée et intuitive pour faciliter l’accès immédiat aux informations essentielles des patients. 
//         Trouvez rapidement les données pertinentes grâce à une navigation fluide et un design optimisé pour les professionnels de santé.
//       </p>
//     </div>
    
//     {/* Service 2: Gestion des dossiers patients */}
//     <div className="flex flex-col items-center text-center">
//       <FaLaptopMedical className="text-4xl text-blue-600 mb-2" />
//       <h3 className="text-xl font-semibold mb-2">Gestion des Dossiers Patients</h3>
//       <p className="text-gray-600 max-w-xs">
//         Développez une gestion efficace des dossiers des patients avec un système centralisé et facile d’utilisation. Accédez à l'historique médical, suivez les traitements et ajustez les soins en fonction des besoins spécifiques de chaque patient.
//       </p>
//     </div>
    
//     {/* Service 3: Sécurité et Confidentialité */}
//     <div className="flex flex-col items-center text-center">
//       <FaShieldAlt className="text-4xl text-blue-600 mb-2" />
//       <h3 className="text-xl font-semibold mb-2">Sécurité et Confidentialité</h3>
//       <p className="text-gray-600 max-w-xs">
//         Nous mettons un accent particulier sur la sécurité des données médicales. Toutes les informations sont protégées par un chiffrement de haute sécurité pour garantir leur confidentialité et leur intégrité.
//       </p>
//     </div>
//   </div>
// </section>


//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-300 py-10 px-6 mt-10">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm sm:text-base">
//           <div>
//             <Link to="/">
//               <span className="text-blue-300 font-semibold text-lg">ACEKO Hopital</span>
//             </Link>
//             <p>
//               Nous sommes un établissement engagé dans la prise en charge des maladies rénales, avec une approche centrée sur l’humain et la technologie.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
//             <ul className="space-y-2">
//               <li>Accès aux informations des patients</li>
//               <li>Gestion des dossiers patients</li>
//               <li>Sécurité et la confidentialité des données médicales</li>
//               <li>Optimisé l'expérience pour adoption facile</li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
//             <ul className="space-y-2">
//               <li>Email : contact@acekohopital.com</li>
//               <li>Téléphone : +229 01 ** ** ** **</li>
//               <li>Adresse : Abomey-Calavi, Bénin</li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-white text-lg font-semibold mb-4">Suivez-nous</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:text-white">Facebook</a></li>
//               <li><a href="#" className="hover:text-white">Twitter</a></li>
//               <li><a href="#" className="hover:text-white">LinkedIn</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
//           &copy; {new Date().getFullYear()} Projet AI4CKD. Tous droits réservés.
//         </div>
//       </footer>
//     </main>
    <div className='flex flex-col justify-between items-center'>
        <div className='w-[70%] h-[400px] rounded-lg shadow-sm py-5 px-3 flex items-center justify-around' style={{background: '#5f6FFF'}}>
            <div className='w-[40%]'>
              <h1 className='text-white font-medium text-3xl mb-2'>Book Appointment With Trusted Doctors</h1>
              <div className='flex p-2 mb-2'>
                <div className='flex mr-2'>
                  <div className='h-8 w-8 rounded-full bg-slate-300 '><img src={userlogo} alt=""  className='rounded-full'/></div>
                  {/* <div className='h-6 w-6 rounded-full bg-slate-300 '><img src={userlogo} alt="" className='rounded-full' /></div>
                  <div className='h-6 w-6 rounded-full bg-slate-300 '><img src={userlogo} alt="" className='rounded-full' /></div> */}
                </div>
                <p className='text-xs flex-wrap font-medium text-slate-100'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
              </div>
              <button onClick={navigate('/login')} className='text-gray-500 px-8 py-1 rounded-full font-medium bg-slate-200' >Login</button>
            </div>
            <div className='w-[40%] h-full'>
              <img src={doc} alt="" className='h-full ' />
            </div>
        </div>
    </div>
  );
}

export default Home;
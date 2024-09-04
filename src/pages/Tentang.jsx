import img from '../assets/img/Balconist.svg';
import './tentang.css';

const Tentang = () => {
    return (<div className="container mt-5 d-flex flex-column  align-items-center gap-4 ">
        <div className="">
            <div className="">
                <h1 className="d-flex justify-content-center h1-title display-1 text-center">Tentang</h1>
                <p className="lead text-center">
                    This is a lead paragraph. It stands out from regular paragraphs.
                </p>
                <div className="d-flex justify-content-center">
                <img className="my-3 mx-auto justify-content-center" src={img} alt="Balconist" />
                </div>
                <p className="tentang-h1 d-flex align-items-center p-title text-start">Balconist adalah label musik dan studio rekaman yang didirikan di Jakarta Utara dengan misi untuk mendukung artis lokal dan menyediakan fasilitas rekaman terbaik. Berasal dari ujung utara Jakarta, Balconist adalah sebuah Creative Playground yang bukan hanya menjadi tempat untuk berkarya, tetapi juga menjadi pusat kegiatan seni yang beragam. Selain sering mengadakan workshop seni rupa seperti melukis, mematung, dan pemutaran film, Balconist juga aktif dalam memproduksi musik musisi indie serta music score dengan pendekatan D.I.Y (Do It Yourself). Beberapa di antaranya adalah Tigarist, JADED, The Dusty Rusty, dan BLUEHASANBLUE. Tigarist, band pertama yang dikeluarkan oleh Balconist, didukung oleh gitar dan vokal pop dari Zulfan Rahman, pukulan perkusi yang memecah ruang dan waktu oleh Sauqi Rahman, serta garis bass yang berasal dari luar bumi oleh Riyan Asmahudi. Upaya dari ketiga orang ini untuk menjadi bagian dari budaya populer‚ meskipun materi yang mereka bawakan cenderung berlawanan dengan musik pop konvensional yang sering kali sedih dan berdasarkan pengalaman pribadi. Bertetangga dengan Pamungkas, Tigarist menyuguhkan racikan musik funk, disco, dan groove ke dalam musik pop, memberikan warna baru di kancah musik di Utara Jakarta. Dengan kombinasi keahlian dan kreativitas masing-masing anggota, Tigarist telah berhasil menciptakan sebuah identitas unik yang membedakan mereka dari band-band lain di industri musik. Dengan berbagai inisiatifnya, Balconist menjadi sebuah wadah yang bersemangat untuk memajukan dunia seni di lingkungan sekitar.</p>
                <figure className="text-end">
  <blockquote className="my-5 blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
  </blockquote>
  <figcaption className="blockquote-footer">
    Someone famous in <cite title="Source Title">Source Title</cite>
  </figcaption>
</figure>
            </div>
        </div>
    </div>
    );
}
export default Tentang;
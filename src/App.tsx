import { useEffect, useRef } from 'react';
import './App.css';

interface IpfsContentFile {
  images_collected_at: string;
  asset_ipfs_hash: string;
  images: { thumbnail: string; url: string; }[];
}

function App() {

  const hasFetchedData = useRef(false);

  useEffect(() => {

    if (hasFetchedData.current) return;

    hasFetchedData.current = true;

    const fetchData = async (): Promise<void> => {
      try {
        console.log("Fetching data from IPFS");

        const ipfsHash: string = "Qmcw111vvxnrwXjFft5dpj1dXJD4Lr1TX26qPLFXt9ggTY";
        const response: Response = await fetch("https://ipfs.io/ipfs/" + ipfsHash);
        const data: IpfsContentFile = await response.json();

        const mainImageUrl: string = 'https://ipfs.io/ipfs/' + data.asset_ipfs_hash;
        const mainImage: HTMLImageElement = document.getElementById("main-image") as HTMLImageElement;
        mainImage.src = mainImageUrl;

        const mainImageCaption: HTMLElement = document.getElementById('main-image-caption') as HTMLElement;
        if (mainImageCaption) {
          mainImageCaption.innerHTML = data.images_collected_at;
        }

        const thumbnailsContainer: HTMLDivElement = document.getElementById("thumbnails") as HTMLDivElement;

        const img: HTMLImageElement = document.createElement("img");
        img.src = mainImageUrl;
        img.className = "thumbnail";
        img.onclick = () => {
          mainImage.src = mainImageUrl;
        };
        thumbnailsContainer?.appendChild(img);

        data.images.forEach((image: { thumbnail: string; url: string; }) => {
          const img: HTMLImageElement = document.createElement("img");
          img.src = image.thumbnail;
          img.className = "thumbnail";
          img.onclick = () => {
              mainImage.src = image.url;
          };
          thumbnailsContainer?.appendChild(img);
        });

      } catch (error) {
        console.error("Erreur lors du chargement du JSON:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <section id="carousel-container">
          <figure>
            <img id="main-image" src="null" alt="Nasa Earth Polychromatic Imaging Camera" />
            <figcaption id="main-image-caption"></figcaption>
          </figure>
          <div id="thumbnails"></div>
        </section>

        <section id="about">
          <p>
            Photos have been collected by Nasa DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. Uniquely positioned at the Earth-Sun Lagrange point, EPIC provides full disc imagery of the Earth and captures unique perspectives of certain astronomical events such as lunar transits using a 2048x2048 pixel CCD (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain telescope.
          </p>
        </section>

        <footer className="footer">
          <p>&copy; 2025 - anyvoid.eth - See on <a href="https://github.com/NicolasMugnier/nasa-latest-epic">GitHub</a></p>
        </footer>
      </div>
    </>
  );
}

export default App;

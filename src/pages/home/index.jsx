import Layout from "@/Layouts/Default";
import BannerPromo from "@/assets/img/banner/banner.png";
import AlertMarquee from "@/components/AlertMarquee";
import GameCard from "@/components/GameCard";

const Home = () => {

return (
    <Layout>
        <div className="grid m-4 grid-cols-1">
            <img src={BannerPromo} className="rounded-sm w-full h-auto bg-green-600" alt="promo"/>
        </div>
        <AlertMarquee/>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            <GameCard title="Diamond Rush" imageSrc="/img/1.PNG" />
            <GameCard title="Lucky Cherry" imageSrc="/img/2.PNG" />
            <GameCard title="Golden Bell" imageSrc="/img/3.PNG" />
        </div>
    </Layout>
)
}

export default Home;
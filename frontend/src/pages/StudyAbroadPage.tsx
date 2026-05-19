import Layout from "@/components/Layout";
import { useParams } from "react-router-dom";
import australiaImg from "@/assets/australia.jpg";
import japanImg from "@/assets/japan.jpg";
import canadaImg from "@/assets/canada.jpg";
import europeImg from "@/assets/europe.jpg";
import usaImg from "@/assets/usa.jpg";
import southkoreaImg from "@/assets/southkorea.jpg";

const countryData: Record<string, { name: string; image: string; content: string }> = {
  australia: {
    name: "Australia",
    image: australiaImg,
    content: "Australia has one of the best institutions and universities in the world. Known for its high-quality education system, world-class research, and multicultural environment, Australia is a top destination for international students. The country offers a wide range of courses and qualifications, from short-term vocational education to doctoral degrees. Australian universities consistently rank among the top in the world, and degrees are recognized globally.",
  },
  japan: {
    name: "Japan",
    image: japanImg,
    content: "Education System in Japan provides world-class opportunities for international students. In the decades following World War II, Japan has rapidly developed into one of the world's most technologically advanced nations. Japanese universities are known for their excellence in engineering, technology, and sciences. The country offers numerous scholarship programs for international students.",
  },
  canada: {
    name: "Canada",
    image: canadaImg,
    content: "Canada offers excellent education with two major intakes. Known for its welcoming immigration policies, high quality of life, and world-renowned universities, Canada is one of the top choices for international students. Canadian degrees and diplomas are recognized worldwide, and the country offers excellent post-graduation work opportunities.",
  },
  europe: {
    name: "Europe",
    image: europeImg,
    content: "It's common knowledge that studying in Europe is rewarding. With its rich cultural heritage, diverse academic programs, and often affordable tuition fees, Europe attracts students from all over the world. Countries like Germany, France, Hungary, and Finland offer excellent education programs, many of which are taught in English.",
  },
  usa: {
    name: "USA",
    image: usaImg,
    content: "The United States of America offers some of the world's finest educational institutions. With thousands of universities and colleges to choose from, the USA provides unparalleled academic diversity. American degrees are highly valued worldwide, and the country is known for its cutting-edge research and innovation.",
  },
  "south-korea": {
    name: "South Korea",
    image: southkoreaImg,
    content: "South Korea offers a dynamic environment for international students with its innovative education system and vibrant cultural experience. Korean universities are rapidly climbing global rankings, and the country offers generous scholarship programs for international students.",
  },
};

const StudyAbroadPage = () => {
  const { country } = useParams();
  const data = countryData[country || ""];

  if (!data) {
    return (
      <Layout>
        <div className="section-padding section-container text-center">
          <h1 className="section-title">Country not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative h-64 md:h-80">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-background">
            Study in {data.name}
          </h1>
        </div>
      </div>
      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <p className="text-muted-foreground leading-relaxed text-lg">{data.content}</p>
        </div>
      </section>
    </Layout>
  );
};

export default StudyAbroadPage;

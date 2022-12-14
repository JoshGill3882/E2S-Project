import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css"
import Carousel from 'react-bootstrap/Carousel';
import Container from "react-bootstrap/Container";
import CarouselCard from "./CarouselCard";
import CarouselModal from "./CarouselModal";
import Comparison from "./Comparison";
import Badge from 'react-bootstrap/Badge';
import backDrop from "./static/images/homeBackDrop.png";
import january from "./static/images/january.png";
import february from "./static/images/february.png"
import march from "./static/images/march.png"
import april from "./static/images/april.png"
import may from "./static/images/may.png"
import june from "./static/images/june.png"
import july from "./static/images/july.png"
import august from "./static/images/august.png"
import september from "./static/images/september.png"
import october from "./static/images/october.png"
import november from "./static/images/november.png"
import december from "./static/images/december.png"
import "./static/css/usage.css"




function Benchmark() {
  return (
    <div className="has-background-grey-lighter">
    <div>
      <h1 style={{backgroundColor:"#70a044", width:"100%", marginBottom:"2%", padding:"3%", color:"White"}}>
        Previous Consumption
      </h1>
      </div>
      {/*  Carousel from Jan - March*/}
      {/* Styled to center the page */}
      {/* Contents of CarouselCard include Title, Desc, Image and label to highlight season*/}
    <Carousel variant="dark" style={{padding: "3rem" , paddingBottom: "5rem", height: "100%"}} className="Carousel" >
      <Carousel.Item>
        <div style={{ display: "flex", gap: "3rem", justifyContent: "center" }}>
          <CarouselCard
                  title="January"
                  description="Energy Usage" 
                  imgSrc={january}
                  winterBadge="Winter">
          </CarouselCard>
          <CarouselCard style={{height: "200px", width: "200px"}}
            title="February" 
            description="Energy Usage" 
            imgSrc={february} 
            winterBadge="Winter"/>
          <CarouselCard 
          title="March" 
          description="Energy Usage" 
          imgSrc={march}
          springBadge="Spring" />
        </div>
  
      </Carousel.Item>

      {/*  Carousel from April - June*/}
      <Carousel.Item>
      <div style={{ display: "flex", gap: "3rem", justifyContent: "center" }}>
          <CarouselCard title="April" description="Energy Usage" springBadge="Spring" imgSrc={april} />
          <CarouselCard title="May" description="Energy Usage" springBadge="Spring" imgSrc={may} />
          <CarouselCard title="June" description="Energy Usage"  summerBadge="Summer"  imgSrc={june} />
        </div>
      </Carousel.Item>
      {/*  Carousel from July - Sept*/}
      <Carousel.Item>
      <div style={{ display: "flex", gap: "3rem", justifyContent: "center" }}>
          <CarouselCard title="July" description="Energy Usage" summerBadge="Summer" imgSrc={july}/>
          <CarouselCard title="August" description="Energy Usage" summerBadge="Summer" imgSrc={august} />
          <CarouselCard title="September" description="Energy Usage" autumnBadge="Autumn" imgSrc={september} />
        </div>
      </Carousel.Item>
      {/*  Carousel from Oct - Dec*/}
      <Carousel.Item>
      <div style={{ display: "flex", gap: "3rem", justifyContent: "center" }}>
          <CarouselCard title="October" description="Energy Usage" autumnBadge="Autumn" imgSrc={october} />
          <CarouselCard title="November" description="Energy Usage" autumnBadge="Autumn" imgSrc={november} />
          <CarouselCard
            title="December" 
            description="Energy Usage" 
            imgSrc={december}
            winterBadge="Winter" />
        </div>
      </Carousel.Item>
    </Carousel>

    <Comparison style={{ display: "flex", gap: "3rem", justifyContent: "center" }}>

    </Comparison>
    </div>
  );
}

export default Benchmark;
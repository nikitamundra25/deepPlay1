import React from "react";
import { Container, Row, Col } from "reactstrap";

const image = [
  {
    id: 1,
    title: "Rumba",
    image:
      "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: 2,
    title: "Zumba",
    image:
      "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
  },
  {
    id: 3,
    title: "Tango",
    image:
      "https://i.pinimg.com/originals/26/94/93/269493fbeb10e31ad3867248e3f68b94.jpg"
  },
  {
    id: 4,
    title: "SalsaFootwork",
    image:
      "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    id: 5,
    title: "Flamenco",
    image:
      "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
  }
];

class SampleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleSet: image,
      showVideoIndex: -1,
      videoIndex: -1
    };
  }
  // handleVideoHoverLeave = () => {
  //   this.setState({
  //     isSelectVideo: false
  //   });
  // };

  // handleVideoPlay = index => {
  //   let myVideo = document.getElementById(`webm-video-${index}`);
  //   myVideo.play();
  // };
  // handleVideoPause = index => {
  //   let myVideo = document.getElementById(`webm-video-${index}`);
  //   myVideo.pause();
  // };
  // handleShowVideo = videoIndex => {
  //   this.setState({
  //     showVideoIndex: videoIndex
  //   });
  // };

  // handleVideoHover = index => {
  //   this.setState({
  //     isSelectVideo: true,
  //     videoIndex: index
  //   });
  // };
  render() {
    return (
      <Container>
        <section className="play-list-collection set-detail-section">
          <Row>
            <Col md="12 p-3">
              <div className="content-header">
                <span className="content-title">
                  <div className="h4 theme-heading main-title">
                    Dance Cheoreography for Uptown Funk
                  </div>
                  <div className="sub-title">5 moves</div>
                </span>
              </div>
            </Col>

            {this.state.sampleSet.map((images, index) => (
              <Col
                md="4"
                key={index}
                // onClick={() => this.handleShowVideo(index)}
                // onMouseLeave={() => {
                //   this.handleVideoHoverLeave();
                // }}
              >
                <div
                  className="play-list-block "
                  // onMouseOver={() => this.handleVideoHover(index)}
                  // onMouseLeave={() => {
                  //   this.handleVideoPause(index);
                  // }}
                >
                  <div
                    className="play-sub-block "
                    // onMouseLeave={() => this.handleVideoPause(index)}
                  >
                    <div
                      className="play-list-img blur-img-wrap checked-wrap"
                      // onMouseOver={() => this.handleVideoPlay(index)}
                    >
                      <img src={images.image} alt={""} />
                      <div
                        className="blur-img"
                        style={{
                          backgroundImage: 'url("' + images.image + '")'
                        }}
                      ></div>
                      {/* <video
                        width={"100%"}
                        id={`webm-video-${index}`}
                        muted={true}
                      >
                        <source src={images.image} type="video/mp4" />
                      </video> */}
                    </div>
                    <div className="play-list-text">
                      <div className="play-list-heading h6 ">
                        {images.title}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    );
  }
}
export default SampleSet;

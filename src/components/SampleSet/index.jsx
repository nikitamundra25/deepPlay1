import React from "react";
import { Container, Row, Col } from "reactstrap";

const image = [
  {
    id: 1,
    title: "Ballet,Russia",
    image:
      "https://www.worldatlas.com/r/w728-h425-c728x425/upload/f5/4c/99/sleeping-beauty-royal-ballet-2008.jpg"
  },
  {
    id: 2,
    title: "Belly Dance",
    image:
      "https://www.worldatlas.com/r/w728-h425-c728x425/upload/1a/f8/01/640px-fatchance-bellydance-01-dsc-0061.jpg"
  },
  {
    id: 3,
    title: "Kabuki",
    image:
      "https://i.pinimg.com/originals/48/88/eb/4888eb8b7d3ad0f05f77c4b6cd3d1edc.jpg"
  },
  {
    id: 4,
    title: "Samba",
    image:
      "https://img-vimbly-com-images.imgix.net/full_photos/samba-7.jpg?auto=compress&fit=crop&h=490&ixlib=php-1.2.1&w=730"
  },
  {
    id: 5,
    title: "Break Dance",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd27DaYsIAL-tCc0RcG6tXfikbGBd5fjwClNEERODIraaxYZ1T_A"
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

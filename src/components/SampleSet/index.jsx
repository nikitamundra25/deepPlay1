import React from "react";
import { Container, Row, Col } from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// const homePageImage = [
//   "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg",
//   "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
//   "https://i.pinimg.com/originals/26/94/93/269493fbeb10e31ad3867248e3f68b94.jpg"
// ];
const image = [
  {
    id: 1,
    title: "SalsaFootwork",
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

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class SampleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleSet: image
    };
  }

  onDragEnd = result => {
    console.log("inside drag");
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.sampleSet,
      result.source.index,
      result.destination.index
    );

    this.setState({
      sampleSet: items
    });
  };
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
            {/* {homePageImage.map((images, index) => (
              <Col md="4" key={index}>
                <div className="play-list-block ">
                  <div className="play-sub-block ">
                    <div className="play-list-img blur-img-wrap checked-wrap">
                      <img src={images} alt="" />
                      <div
                        className="blur-img"
                        style={{
                          backgroundImage: 'url("' + images + '")'
                        }}
                      ></div>
                    </div>
                    <div className="play-list-text">
                      <div className="play-list-heading h6 ">
                        {"Salsa Footwork"}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))} */}
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction={"horizontal"}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Row>
                      {this.state.sampleSet.map((images, index) => (
                        <Col md="4" key={index}>
                          <Draggable
                            key={images.id}
                            draggableId={images.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="play-list-block"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="play-sub-block ">
                                  <div className="play-list-img blur-img-wrap checked-wrap">
                                    <img src={images.image} alt="" />
                                    <div
                                      className="blur-img"
                                      style={{
                                        backgroundImage: 'url("' + images + '")'
                                      }}
                                    ></div>
                                  </div>
                                  <div className="play-list-text">
                                    <div className="play-list-heading h6 ">
                                      {images.title}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        </Col>
                      ))}
                    </Row>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Row>
        </section>
      </Container>
    );
  }
}
export default SampleSet;

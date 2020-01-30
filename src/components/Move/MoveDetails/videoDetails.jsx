import React from "react";
import { Col, FormGroup, Label, FormFeedback, InputGroup, Button, Form, Row, Input } from "reactstrap";
import CreatableSelect from "react-select/creatable";
import "react-tagsinput/react-tagsinput.css";
import AsyncSelect from "react-select/async";
import InputRange from "react-input-range";
import "./index.scss";
import playIc from "../../../assets/img/icons/play.svg";
import pauseIc from "../../../assets/img/icons/pause.svg";
import { AppConfig } from "config/Appconfig";
import { SecondsToMMSSMM } from "helper/Time";
// core components
class VideoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        min: 0,
        max: 15
      },
      value: {
        min: 0,
        max: 10
      },
      focusTip: false,
      cutCount: [1]
    };
  }
  clickCount = () => {
    const cutCount=this.state.cutCount
    cutCount.push(cutCount[cutCount.length-1] + 1)
    // console.log(cutCount,'cutCount')
    this.setState({cutCount}, () => {
            console.log(this.state.cutCount, "ssssss");
          }
      )
    // this.setState(
    //   {
    //     cutCount: this.state.cutCount + 1
    //   }, () => {
    //     console.log(this.state.cutCount, "ssssss");
    //   })
  }
  delethandler=(index)=>{
    const cutCount=this.state.cutCount;
    cutCount.pop(cutCount[index])
    this.setState({cutCount})
  }
  getDetails = () => {
    const { tags, selectSetOptions } = this.props;
    return {
      tags,
      setId: selectSetOptions ? selectSetOptions.value : null
    };
  };

  loadSets = (input, callback) => {
    if (input.length > 1) {
      this.props.getAllSetRequest({
        search: input,
        callback,
        isSetNoLimit: false
      });
    } else {
      this.props.getAllSetRequest({ isSetNoLimit: false });
    }
  };

  labelValueChange = value => {
    let { min, max } = value;
    const { time } = this.state;
    const { videoMetaData } = this.props;
    const { duration } = videoMetaData || {};
    const { seconds: maxValue } = duration || {};
    if (min >= 0) {
      if (min !== parseInt(time.min) && min >= max) {
        max =
          parseInt(min) + AppConfig.MAX_VIDEO_LENGTH < maxValue
            ? parseInt(min) + AppConfig.MAX_VIDEO_LENGTH
            : maxValue;
        value.max = max;
      } else if (max !== parseInt(time.max) && min >= max) {
        min =
          max - AppConfig.MAX_VIDEO_LENGTH < 0
            ? max - AppConfig.MAX_VIDEO_LENGTH
            : 0;
        value.min = min;
      }
      if (parseInt(max) - parseInt(min) > AppConfig.MAX_VIDEO_LENGTH) {
        this.setState(
          {
            time: {
              max:
                parseInt(max) === Math.round(time.max)
                  ? parseInt(min) + AppConfig.MAX_VIDEO_LENGTH
                  : parseInt(max),
              min:
                parseInt(min) === Math.round(time.min)
                  ? parseInt(max) - AppConfig.MAX_VIDEO_LENGTH
                  : parseInt(min)
            }
          },
          () => {
            this.props.onTimerChange(this.state.time, { isVideoSleek: true });
          }
        );
        return;
      }
      this.setState(
        {
          time: value
        },
        () => {
          this.props.onTimerChange(this.state.time, { isVideoSleek: true });
        }
      );
    } else {
      return;
    }
  };

  render() {
    const { selectSetOptions, setReducer, tags, errors, tagsList } = this.props;
    const { recentSetAdded, allSetList } = setReducer;
    const { time, cutCount } = this.state;
    let recentAddedSet,
      defaultSetoptions = [];
    if (allSetList && allSetList.length) {
      allSetList.map(data => {
        const defaultSetoptionsValue = {
          label:
            data && data.isCopy
              ? `${data.title} ${
              data.copyCount > 0 ? `(${data.copyCount})` : ""
              }`
              : data.title,
          value: data._id,
          moveCount: data.moveCount
        };

        defaultSetoptions.push(defaultSetoptionsValue);
        return true;
      });
      const addNewOption = {
        label: "+ Create New Set",
        value: ""
      };
      defaultSetoptions.push(addNewOption);
    } else {
      const addNewOption = {
        label: "+ Create New Set",
        value: ""
      };
      defaultSetoptions.push(addNewOption);
    }
    if (recentSetAdded && recentSetAdded.value) {
      recentAddedSet = {
        label: recentSetAdded.title,
        value: recentSetAdded._id
      };
    }

    return (
      <>
        <Col lg={8} className="trim-video-text">
          <div className="video-right-section">
            <div className={"font-weight-bold h4"}>Trim your video</div>
            <span>
              Use sliders below to trim your video (15 secs max). Or use your
              arrow keys on timestamps to get really precise.
            </span>
            <div className="triming-section">
              <div className="triming-wrap">
                <div className="triming-block">
                  <Button className="triming-button play-button" color={' '}>
                    <img src={playIc} alt={playIc} />
                  </Button>
                  <Button className="triming-button pause-button " color={' '}>
                    <img src={pauseIc} alt={pauseIc} />
                  </Button>
                  <Button className="triming-button pause-button time-decrease " color={' '}>-3s</Button><Button className="triming-button time-increase " color={' '}>+3s</Button>
                  <div className="triming-bounds"><b>20.03</b> / 23.01</div>
                </div>
                <div className="triming-video-length">Output: <span className="triming-number">00.09s</span>
                </div>
              </div>
              <div className="dot-rang-slider rang-slider pb-2 main-rang-slider">
                <InputRange
                  maxValue={20}
                  minValue={0}

                  //  value={this.state.value}
                  value={this.state.value}

                  onChange={value => this.setState({ value })}
                />
              </div>
              <div className="video-cutting-section">
                { this.state.cutCount.map((value1, index) => (
                  <div className="video-cutting-block" count={value1}  key={value1}>
                    <div className="rang-slider ">
                      <InputRange
                        maxValue={20}
                        minValue={0}

                        //  value={this.state.value}
                        value={this.state.time}

                        onChange={time => this.setState({ time })}

                      />
                      <div className="cutting-time-frame">
                        <Form className="cutting-time-form">
                          <Row className="">
                            <Col sm={6}>
                              <FormGroup>
                                <Label for="lastName"> Start</Label>
                                <Input
                                  id="exampleFormControlInput1"
                                  placeholder="Doe"
                                  type="text"
                                  className={""}
                                  name="lastName"
                                  autocomplete="off"
                                  onFocus={
                                    () => {
                                      this.setState(
                                        { focusTip: true });
                                    }
                                  }
                                  onBlur={
                                    () => {
                                      this.setState(
                                        { focusTip: false });
                                    }
                                  }
                                />
                                {/* <FormFeedback>
              {errors.lastName || !lastName
                ? errors.lastName
                : null}
            </FormFeedback> */}
                              </FormGroup>
                            </Col>
                            <Col sm={6}>
                              <FormGroup>
                                <Label for="lastName">End</Label>
                                <Input
                                  id="exampleFormControlInput1"
                                  placeholder="Doe"
                                  type="text"
                                  className={""}
                                  name="lastName"
                                  autocomplete="off"
                                  onFocus={
                                    () => {
                                      this.setState(
                                        { focusTip: true },
                                        () => {
                                          console.log(this.state.focusTip)
                                        }
                                      );
                                    }
                                  }
                                  onBlur={
                                    () => {
                                      this.setState(
                                        { focusTip: false }
                                        ,
                                        () => {
                                          console.log(this.state.focusTip)
                                        }
                                      );
                                    }
                                  }
                                />
                                {/* <FormFeedback>
              {errors.lastName || !lastName
                ? errors.lastName
                : null}
            </FormFeedback> */}
                              </FormGroup>
                            </Col>
                            {this.state.focusTip ?
                              <Col sm={12}>
                                <label className=""><b>Tip:</b> Use the <i className="fas fa-arrow-up"></i> or <i className="fas fa-arrow-down"></i> arrow keys for finer adjustments</label>
                              </Col> : null}
                          </Row>
                        </Form>
                        <div className="delete-cut-wrap" onClick={() => this.delethandler(index)}>Delet Cut</div>
                      </div>
                    </div>
                  </div>

    ))
                            }
              </div>
              <div className="trimming-buttons-wrap ">
                <Button className="btn-line-black" onClick={this.clickCount}>
                  <i class="fa fa-plus" aria-hidden="true"></i> Add Cut
                  </Button>
                <Button className="btn-black " color={" "}>
                  Done <i class="fa fa-angle-right"></i>
                </Button>
              </div>
            </div>
          </div>

        </Col>
      </>
    );
  }
}

export default VideoDetails;
  // <FormGroup className="flex-fill flex-column mt-3 input-w">

  //           <Label className="mt-2">Add tags and press enter to separate</Label>
  //           <div className="w-100 tag-input-wrap search-select-wrap">
  //             {/* <TagsInput
  //               value={tags}
  //               className={"form-control"}
  //               maxTags={"5"}
  //               onChange={this.props.handleTagChange}
  //             /> */}
  //             <CreatableSelect
  //               classNamePrefix="react_select"
  //               isMulti
  //               onChange={this.props.handleTagChange}
  //               value={tags}
  //               options={tagsList}
  //               // options={colourOptions}
  //             />
  //           </div>
  //         </FormGroup>
  //         <FormGroup className="flex-fill flex-column mt-3">
  //           {/* add search-select class for search select design  */}
  //           <Label className="mt-2">
  //             Select sets <span className="text-danger">*</span>
  //           </Label>
  //           <InputGroup>
  //             <div className="w-100 search-select-wrap">
  //               <AsyncSelect
  //                 classNamePrefix="react_select"
  //                 loadOptions={this.loadSets}
  //                 isClearable={
  //                   selectSetOptions && selectSetOptions.value ? true : false
  //                 }
  //                 defaultOptions={defaultSetoptions}
  //                 onBlur={this.props.onBlur}
  //                 placeholder="Type to select sets"
  //                 className={
  //                   errors && errors.setId
  //                     ? "is-invalid form-control search-input-wrap"
  //                     : ""
  //                 }
  //                 onChange={e => this.props.handleInputChange(e)}
  //                 value={
  //                   recentAddedSet &&
  //                   recentAddedSet.label &&
  //                   recentAddedSet.value
  //                     ? recentAddedSet
  //                     : selectSetOptions
  //                 }
  //               />
  //               <FormFeedback>
  //                 {errors &&
  //                 errors.setId &&
  //                 selectSetOptions &&
  //                 selectSetOptions.value === ""
  //                   ? errors.setId
  //                   : null}
  //               </FormFeedback>
  //             </div>
  //           </InputGroup>
  //         </FormGroup>

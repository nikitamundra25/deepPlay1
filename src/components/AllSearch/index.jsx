import React from "react";
import emptyFolderIc from "../../assets/img/empty-folder.png";
import Loader from "../comman/Loader/Loader";
import { AppRoutes } from "../../config/AppRoutes";
import emptyFoldeIc from "../../assets/img/empty-folder.png";
import emptySetIc from "../../assets/img/empty-sets.png";
import emptyMoveIc from "../../assets/img/empty-moves.png";
import "./index.scss";
// core components
class AllSearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }
  handleMoveSearch = movelist => {
    this.props.handleSearchEmpty();
    this.props.handleMoveSearch(movelist);
  };
  render() {
    const { searchData, isSearchLoading, profiledata } = this.props;
    let folderList, setList, movelist;
    if (searchData && searchData.length) {
      folderList = searchData.filter(
        item =>
          item.searchType === "folder" &&
          item.userId === profiledata._id &&
          item.isDeleted === false
      );
      setList = searchData.filter(
        item =>
          item.searchType === "sets" &&
          item.userId === profiledata._id &&
          item.isDeleted === false
      );
      movelist = searchData.filter(
        item =>
          item.searchType === "move" &&
          item.userId === profiledata._id &&
          item.isDeleted === false
      );
    }
    return (
      <>
        {!isSearchLoading ? (
          <div
            className="search-result-wrap cutom-scroll temprari-static-search"
            ref={this.props.setWrapperRef}
          >
            {folderList && folderList.length ? (
              <div className="search-result-block  moves-block">
                <div className="category-wrap">
                  <div className="category-heading">Folders</div>
                  {folderList && folderList.length >= 5 ? (
                    <span
                      onClick={this.props.searchAllFolder}
                      className="view-all-wrap font-weight-bold"
                    >
                      View All
                    </span>
                  ) : null}
                </div>
                <div className="folder-searched-wrap searched-wrap">
                  <div className="searched-block">
                    {folderList && folderList.length
                      ? folderList.slice(0, 5).map((folderData, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                this.props.redirectTo(
                                  AppRoutes.FOLDER_DETAILS.url.replace(
                                    ":id",
                                    folderData._id
                                  )
                                );
                                this.props.handleSearchEmpty();
                              }}
                              className="cursor_pointer searched-tile"
                            >
                              <div className="searhed-img-main-wrap">
                                <div className="searched-img-wrap">
                                  <div className="searched-img">
                                    <img src={emptyFolderIc} alt={"folder"} />
                                  </div>
                                </div>
                              </div>
                              <div className="searched-text">
                                {/* {folderData.title} */}
                                {folderData.isCopy
                                  ? `Copy of ${folderData.title} ${
                                      folderData.copyIndex > 0
                                        ? `(${folderData.copyIndex})`
                                        : ""
                                    }`
                                  : folderData.title}
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="search-result-block empty-result-block moves-block ">
                <div className="category-wrap">
                  <div className="category-heading">Folders</div>
                </div>
                <div className="searched-wrap">
                  <div className="searched-block">
                    <div className="cursor_pointer searched-tile">
                      <div className="searhed-img-main-wrap">
                        <div className="searched-img-wrap">
                          <div className="searched-img">
                            <img alt={""} src={emptyFoldeIc} />
                          </div>
                        </div>
                      </div>
                      <div className="searched-text mt-1">
                        No folder for this keywords
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {setList && setList.length ? (
              <div className="search-result-block  moves-block">
                <div className="category-wrap">
                  <div className="category-heading">Sets</div>
                  {setList && setList.length >= 5 ? (
                    <span
                      onClick={this.props.searchAllSet}
                      className="view-all-wrap font-weight-bold"
                    >
                      View All
                    </span>
                  ) : null}
                </div>
                <div className="searched-wrap">
                  <div className="searched-block">
                    {setList && setList.length
                      ? setList.slice(0, 5).map((setData, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                this.props.redirectTo(
                                  AppRoutes.SET_DETAILS.url.replace(
                                    ":id",
                                    setData._id
                                  )
                                );
                                this.props.handleSearchEmpty();
                              }}
                              className="cursor_pointer searched-tile"
                            >
                              <div className="searhed-img-main-wrap">
                                <div className="searched-img-wrap">
                                  <div className="searched-img">
                                    <img src={emptySetIc} alt={"folder"} />
                                  </div>
                                </div>
                              </div>
                              <div className="searched-text">
                                {setData.isCopy
                                  ? `Copy of ${setData.title} ${
                                      setData.copyIndex > 0
                                        ? `(${setData.copyIndex})`
                                        : ""
                                    }`
                                  : setData.title}
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>
              </div>
            ) : (
              <div className="search-result-block empty-result-block moves-block ">
                <div className="category-wrap">
                  <div className="category-heading">Sets</div>
                </div>
                <div className="searched-wrap">
                  <div className="searched-block">
                    <div className="cursor_pointer searched-tile">
                      <div className="searhed-img-main-wrap">
                        <div className="searched-img-wrap">
                          <div className="searched-img">
                            <img alt={""} src={emptySetIc} />
                          </div>
                        </div>
                      </div>
                      <div className="searched-text mt-1">
                        No set for this keywords
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {movelist && movelist.length ? (
              <div className="search-result-block moves-block">
                <div className="category-wrap">
                  <div className="category-heading">Moves</div>
                  {movelist && movelist.length >= 5 ? (
                    <span
                      onClick={this.props.searchAllMove}
                      className="view-all-wrap font-weight-bold"
                    >
                      View All
                    </span>
                  ) : null}
                </div>
                <div className="searched-wrap">
                  <div className="searched-block">
                    {movelist.slice(0, 5).map((moveData, index) => {
                      return (
                        <div
                          key={index}
                          // onClick={() => {
                          //   this.props.redirectTo(
                          //     AppRoutes.MOVE_DETAILS.url.replace(
                          //       ":id",
                          //       moveData._id
                          //     )
                          //   );
                          //   this.props.handleSearchEmpty();
                          // }}
                          //  onClick={() => this.props.handleMoveSearch(movelist)}
                          onClick={() => this.handleMoveSearch(movelist)}
                          className="cursor_pointer searched-tile"
                        >
                          <div className="searhed-img-main-wrap">
                            <div className="searched-img-wrap">
                              <div className="searched-img">
                                {/* <img alt={""} src={emptyMoveIc} /> */}
                                <video width={"100%"} id="webm-video">
                                  <source
                                    src={`${moveData.moveURL}`}
                                    type="video/webm"
                                  />
                                </video>
                              </div>
                            </div>
                          </div>
                          <div className="searched-text">{moveData.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="search-result-block empty-result-block moves-block ">
                <div className="category-wrap">
                  <div className="category-heading">Moves</div>
                </div>
                <div className="searched-wrap">
                  <div className="searched-block">
                    <div className="cursor_pointer searched-tile">
                      <div className="searhed-img-main-wrap">
                        <div className="searched-img-wrap">
                          <div className="searched-img">
                            <img alt={""} src={emptyMoveIc} />
                          </div>
                        </div>
                      </div>
                      <div className="searched-text mt-1">
                        No move for this keywords
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="search-result-wrap cutom-scroll loader-no-height loader-no-background">
            <Loader />
          </div>
        )}
      </>
    );
  }
}

export default AllSearchComponent;

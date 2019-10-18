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

  render() {
    const { searchData, isSearchLoading } = this.props
    let folderList, setList, movelist
    if (searchData && searchData.length) {
      folderList = searchData.filter(item => item.searchType === "folder")
      setList = searchData.filter(item => item.searchType === "sets")
      movelist = searchData.filter(item => item.searchType === "move")
    }
    return (
      <>

        {
          !isSearchLoading ?
            <div className="search-result-wrap cutom-scroll temprari-static-search">
              {
                folderList && folderList.length ?
                  <div className="search-result-block  moves-block">
                    <div className="category-wrap">
                      <div className="category-heading">
                        Folders
                      </div>
                    </div>
                    <div className="folder-searched-wrap searched-wrap">
                      <div className="searched-block">
                        {
                          folderList && folderList.length ? folderList.map((folderData, index) => {
                            return (
                              <div key={index} onClick={() => {
                                this.props.redirectTo(
                                  AppRoutes.FOLDER_DETAILS.url.replace(":id", folderData._id)
                                );
                                this.props.handleSearchEmpty()
                              }
                              } className="cursor_pointer searched-tile">
                                <div className="searhed-img-main-wrap">
                                  <div className="searched-img-wrap">
                                    <div className="searched-img">
                                      <img src={emptyFolderIc} alt={"folder"} />
                                    </div>
                                  </div>
                                </div>
                                <div className="searched-text">
                                  {folderData.title}
                                </div>
                              </div>
                            )
                          }) : null
                        }
                      </div>
                    </div>
                  </div> : 
                    <div className="search-result-block empty-result-block moves-block ">
                    <div className="category-wrap">
                      <div className="category-heading">
                        Folders
                    </div>
                    </div>
                    <div className="searched-wrap">
                      <div className="searched-block">
                        <div
                          className="cursor_pointer searched-tile">
                          <div className="searhed-img-main-wrap">
                            <div className="searched-img-wrap">
                              <div className="searched-img">
                                <img alt={""} src={emptyFoldeIc} />
                              </div>
                            </div>
                          </div>
                          <div className="searched-text mt-1">
                            No data for this keywords
                                </div>
                        </div>
                      </div>
                    </div>
                  </div>
              }
              {
                setList && setList.length ?
                  <div className="search-result-block  moves-block">
                    <div className="category-wrap">
                      <div className="category-heading">
                        Sets
                      </div>
                    </div>
                    <div className="searched-wrap">
                      <div className="searched-block">
                        {
                          setList && setList.length ? setList.map((setData, index) => {
                            return (
                              <div key={index} onClick={() => {
                                this.props.redirectTo(
                                  AppRoutes.SET_DETAILS.url.replace(":id", setData._id)
                                );
                                this.props.handleSearchEmpty()
                              }} className="cursor_pointer searched-tile">
                                <div className="searhed-img-main-wrap">
                                  <div className="searched-img-wrap">
                                    <div className="searched-img">
                                      <img src={emptySetIc} alt={"folder"} />
                                    </div>
                                  </div>
                                </div>
                                <div className="searched-text">
                                  {setData.title}
                                </div>
                              </div>
                            )
                          }) : null
                        }
                      </div>
                    </div>
                  </div> :
                   <div className="search-result-block empty-result-block moves-block ">
                   <div className="category-wrap">
                     <div className="category-heading">
                       Sets
                   </div>
                   </div>
                   <div className="searched-wrap">
                     <div className="searched-block">
                       <div
                         className="cursor_pointer searched-tile">
                         <div className="searhed-img-main-wrap">
                           <div className="searched-img-wrap">
                             <div className="searched-img">
                               <img alt={""} src={emptySetIc} />
                             </div>
                           </div>
                         </div>
                         <div className="searched-text mt-1">
                           No data for this keywords
                               </div>
                       </div>
                     </div>
                   </div>
                 </div>
              }
              {
                movelist && movelist.length ?
                  <div className="search-result-block moves-block">
                    <div className="category-wrap">
                      <div className="category-heading">
                        Moves
                      </div>
                    </div>
                    <div className="searched-wrap">
                      <div className="searched-block">
                        {
                          movelist.map((moveData, index) => {
                            return (
                              <div key={index} onClick={() => {
                                this.props.redirectTo(
                                  AppRoutes.MOVE_DETAILS.url.replace(":id", moveData._id)
                                );
                                this.props.handleSearchEmpty()
                              }} className="cursor_pointer searched-tile">
                                <div className="searhed-img-main-wrap">
                                  <div className="searched-img-wrap">
                                    <div className="searched-img">
                                      <img alt={""} src="https://a10.gaanacdn.com/gn_img/albums/P7m3GNKqxo/7m3GjN47Kq/size_m.jpg" />
                                    </div>
                                  </div>
                                </div>
                                <div className="searched-text">
                                  {moveData.title}
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div> :
                  <div className="search-result-block empty-result-block moves-block ">
                    <div className="category-wrap">
                      <div className="category-heading">
                        Moves
                    </div>
                    </div>
                    <div className="searched-wrap">
                      <div className="searched-block">
                        <div
                          className="cursor_pointer searched-tile">
                          <div className="searhed-img-main-wrap">
                            <div className="searched-img-wrap">
                              <div className="searched-img">
                                <img alt={""} src={emptyMoveIc} />
                              </div>
                            </div>
                          </div>
                          <div className="searched-text mt-1">
                            No data for this keywords
                                </div>
                        </div>
                      </div>
                    </div>
                  </div>

              }
            </div> :
            <div className="search-result-wrap cutom-scroll loader-no-height loader-no-background">
              <Loader />
            </div>
        }
      </>
    );
  }
}

export default AllSearchComponent;

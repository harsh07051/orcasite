import React, { Component } from "react"
import { Paper, Hidden, Container, Grid } from "@material-ui/core"

import FeedPageV2 from "./FeedPageV2"
import PlayerV2 from "./PlayerV2"
import DetectionDialogV2 from "./DetectionDialogV2"
import SiteMenu from "./SiteMenu"
import AboutV2 from "./AboutV2"
import AudioExamplesV2 from "./AudioExamplesV2"
import VerticalImageV2 from "./VerticalImageV2"

import CssBaseline from "@material-ui/core/CssBaseline"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/styles"

import styled from "styled-components"
// import "typeface-roboto"

// TODO: Put this is a separate directory and file....
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3"
    },
    secondary: {
      main: "#009688"
    }
  }
})

const desktopBreakpoint = `@media screen and (min-width: 599px)`

const FeedPageLayout = styled.div`
  display: flex;
`

const PlayerLayout = styled.div`
  display: flex;
`

const HomeLayoutContainer = styled.div`
  ${desktopBreakpoint} {
    display: grid;
    grid-template-columns: 60% 40%;

    .image {
      display: block;
    }
  }

  .image {
    display: none;
  }
`

export default class HomeV2 extends Component {
  state = {}

  componentDidMount() {
    if (["beta", "dev", "staging"].indexOf(ENV.ENV_NAME) >= 0) {
      document.title = `Orcasound ${ENV.ENV_NAME}`
    } else {
      document.title = `Orcasound`
    }
  }

  changeFeed = currentFeed => this.setState({ currentFeed, autoplay: true })

  render() {
    const { feedSlug } = this.props.match.params
    console.log("theme", theme)
    return (
      <>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <Paper square elevation={0}>
              <SiteMenu />
              {!feedSlug && (
                <Grid
                  container
                  spacing={0}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <AboutV2 />
                    <AudioExamplesV2 />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Hidden xsDown>
                      <VerticalImageV2 />
                    </Hidden>
                  </Grid>
                </Grid>
              )}
              {feedSlug && (
                <FeedPageLayout>
                  <FeedPageV2
                    feedSlug={feedSlug}
                    onChangeFeed={this.changeFeed}
                  >
                    <PlayerLayout>
                      <PlayerV2
                        currentFeed={this.state.currentFeed}
                        key={
                          this.state.currentFeed &&
                          this.state.currentFeed.nodeName
                        }
                        autoplay={this.state.autoplay}
                      />
                    </PlayerLayout>
                  </FeedPageV2>
                </FeedPageLayout>
              )}
            </Paper>
          </MuiThemeProvider>
        </StylesProvider>
      </>
    )
  }
}

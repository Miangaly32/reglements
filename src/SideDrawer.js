import Drawer from 'react-native-drawer'
import React from 'react';
import DrawerContent from './components/DrawerContent';

export default class SideDrawer extends React.Component {
  render() {
    return (
      <Drawer
        type="overlay"
        content={<DrawerContent />}
        tapToClose={true}
        openDrawerOffset={0.2} 
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({ main: { opacity: (2 - ratio) / 2 } })}
      >
        {React.Children.map(this.props.children, c => React.cloneElement(c, {
          route: this.props.route
        }))}
      </Drawer>
    )
  }
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
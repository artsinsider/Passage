import React      from 'react';
import ClassNames from '../../../helpers/ClassNames';
import './media.scss'

export default class MediaQuaries extends React.Component {
    state = {
        collapse: true
    };

    toggleSidebar = () => {
        this.setState({collapse: !this.state.collapse})
    };

    render() {
        const {collapse} = this.state;
        const sidebarToggle = ClassNames({"toggle-sidebar" : true, collapse});
        const sidebarCollapse = ClassNames({"sidebar" : true, collapse});

        return (
            <div className="media-container">
                <header>
                    Header
                </header>
                <div  className={sidebarCollapse}>
                    <div onClick={this.toggleSidebar} className={sidebarToggle}/>
                    sidebar
                </div>
                <section>
                    section
                </section>
                <footer>
                    footer
                </footer>
            </div>
        )
    }
}
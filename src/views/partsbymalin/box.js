


const Box = ( { color } ) => {
    const boxstyle = {
        width: '300px',
        height: '300px',
        backgroundColor: color,
        padding: '50px',
        margin: '20px'
      };
    return (
        <div style={boxstyle}>

        </div>
    )
}
export default Box
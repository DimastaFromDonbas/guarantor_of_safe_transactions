function ButtonHome({ content, clas, color, style }) {

    return (<>
        <button className={clas || ''} style={{ height: '100px', width: '300px', borderRadius: '10px', background: color || 'red', ...style }}>{content || ''}</button>
    </>)
}

export default ButtonHome


function Button({ action, onClick }){
    return <button className="button" onClick={onClick}>
          {action}
        </button>;
}

export default Button;
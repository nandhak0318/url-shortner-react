import ReactiveButton from 'reactive-button'

function ReactButton({
  color,
  idleText,
  loadingText,
  successText,
  errorText,
  size,
  btnState,
  onClickHandler,
  style,
  rounded,
  shadow,
}) {
  return (
    <ReactiveButton
      buttonState={btnState}
      onClick={onClickHandler}
      color={color || 'light'}
      idleText={idleText || 'click!'}
      loadingText={loadingText || 'processing...'}
      successText={successText || 'done'}
      errorText={errorText || 'Error'}
      type={'button'}
      classNameName={'sbtn'}
      style={style || {}}
      outline={true}
      shadow={shadow || true}
      rounded={rounded || false}
      size={size || 'large'}
      block={false}
      messageDuration={2000}
      disabled={false}
      buttonRef={null}
      width={null}
      height={null}
      animation={true}
    />
  )
}

export default ReactButton

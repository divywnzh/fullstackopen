# const handleLeftClick = () => setClicks({ ...clicks, left: clicks.left + 1 })

# const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1 })

Some readers might be wondering why we didn't just update the state directly, like this:

# const handleLeftClick = () => { 
#   clicks.left++ 
#   setClicks(clicks)
# }

The application appears to work. However, it is forbidden in React to mutate state directly, since it can result in unexpected side effects. Changing state has to always be done by setting the state to a new object. If properties from the previous state object are not changed, they need to simply be copied, which is done by copying those properties into a new object and setting that as the new state.
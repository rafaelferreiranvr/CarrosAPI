const Display = {
    None: 'none',
    Block: 'block',
    Flex: 'flex',
    Grid: 'grid',
    InlineBlock: 'inline-block',
    Inline: 'inline'
};

const JustifyContent = {
    Start: 'flex-start',
    End: 'flex-end',
    Center: 'center',
    SpaceBetween: 'space-between',
    SpaceAround: 'space-around',
    SpaceEvenly: 'space-evenly'
};

const AlignItems = {
    Start: 'flex-start',
    End: 'flex-end',
    Center: 'center',
    Stretch: 'stretch',
    Baseline: 'baseline'
};

const FlexDirection = {
    Row: 'row',
    Column: 'column',
    RowReverse: 'row-reverse',
    ColumnReverse: 'column-reverse'
};

const Cursor = {
    Default: 'default',
    Pointer: 'pointer',
    Text: 'text',
    NotAllowed: 'not-allowed',
    Wait: 'wait',
    Move: 'move'
};

const Overflow = {
    Visible: 'visible',
    Hidden: 'hidden',
    Scroll: 'scroll',
    Auto: 'auto'
};

const Position = {
    Static: 'static',
    Relative: 'relative',
    Absolute: 'absolute',
    Fixed: 'fixed',
    Sticky: 'sticky'
};

const HoveringMode = {
    Background: 'background',  
    Element: 'element'        
};

const BorderStyle = {
    None: 'none',
    Solid: 'solid',
    Dashed: 'dashed',
    Dotted: 'dotted',
    Double: 'double',
    Groove: 'groove',
    Ridge: 'ridge',
    Inset: 'inset',
    Outset: 'outset',
    Hidden: 'hidden'
};

const MarginValue = {
    Auto: 'auto',
    Initial: 'initial',
    Inherit: 'inherit',
    Unset: 'unset'
};

const TextAlign = {
    Left: 'left',
    Center: 'center',
    Right: 'right',
    Justify: 'justify'
};

const ZIndex = {
    Auto: 'auto',
    Default: '1',
    Modal: '1000'
};

const BorderRadius = {
    None: '0',
    Small: '4px',
    Medium: '8px',
    Large: '16px'
};

const Padding = {
    None: '0',
    Small: '8px',
    Medium: '16px',
    Large: '24px'
};

const Width = {
    Auto: 'auto',
    Full: '100%',
    Half: '50%',
    Quarter: '25%',
    Custom: (value) => `${value}px`
};

const StatusCar = {
    Unavailable: 0,
    Available: 1
};



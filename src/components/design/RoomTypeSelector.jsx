
/**
 * Room types configuration
 */
const ROOM_TYPES = {
  interior: [
    { id: 'living-room', label: 'Living Room', icon: 'fa-couch' },
    { id: 'bedroom', label: 'Bedroom', icon: 'fa-bed' },
    { id: 'kitchen', label: 'Kitchen', icon: 'fa-utensils' },
    { id: 'bathroom', label: 'Bathroom', icon: 'fa-bath' },
    { id: 'dining-room', label: 'Dining Room', icon: 'fa-chair' },
    { id: 'home-office', label: 'Home Office', icon: 'fa-laptop-house' },
    { id: 'pooja-room', label: 'Pooja Room', icon: 'fa-om' },
    { id: 'balcony', label: 'Balcony', icon: 'fa-door-open' },
    { id: 'terrace', label: 'Terrace', icon: 'fa-cloud-sun' },
    { id: 'entrance', label: 'Entrance', icon: 'fa-door-open' },
  ],
  exterior: [
    { id: 'facade', label: 'House Facade', icon: 'fa-building' },
    { id: 'garden', label: 'Garden', icon: 'fa-seedling' },
    { id: 'entrance-gate', label: 'Entrance Gate', icon: 'fa-archway' },
    { id: 'balcony-exterior', label: 'Balcony', icon: 'fa-door-open' },
    { id: 'terrace-garden', label: 'Terrace Garden', icon: 'fa-cloud-sun' },
    { id: 'parking', label: 'Parking Area', icon: 'fa-car' },
    { id: 'swimming-pool', label: 'Swimming Pool', icon: 'fa-swimming-pool' },
  ],
};

/**
 * RoomTypeSelector - Select room/space type based on design mode
 */
const RoomTypeSelector = ({ designMode, value, onChange }) => {
  const roomTypes = ROOM_TYPES[designMode] || ROOM_TYPES.interior;

  return (
    <div className="room-type-selector">
      <label className="form-label mb-3">
        <i className="fas fa-cube me-2"></i>
        {designMode === 'interior' ? 'Room Type' : 'Space Type'}
        <span className="text-danger ms-1">*</span>
      </label>

      <div className="room-type-grid">
        {roomTypes.map((room) => (
          <button
            key={room.id}
            type="button"
            className={`room-type-card ${value === room.id ? 'active' : ''}`}
            onClick={() => onChange(room.id)}
          >
            <i className={`fas ${room.icon} room-icon`}></i>
            <span className="room-label">{room.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export { ROOM_TYPES };
export default RoomTypeSelector;

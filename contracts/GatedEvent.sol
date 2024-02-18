// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract GatedEvent {
    //Address of platfrom NFT
    //address NFTAddress;

    constructor() /*address _nftAddress*/ {
        //NFTAddress = _nftAddress;
    }

    // Events
    event NewEventCreated(
        uint256 indexed Id,
        string indexed Title,
        string indexed Host
    );

    // Struct Decleration to group event data.
    struct EventStruct {
        uint256 Id;
        string Title;
        string Details;
        string Host;
        string DateTime;
        string Location;
        //address[] Registerd;
        AttendeeDetails[] AttendeeInfo; // Struct to capture attendance details and link it to event.

        //TODO: Add MetaData for Images.

        //TODO: ADVANCE: MetaData for Google API Location.
    }

    //Struct Decleration for Attendee personal informations
    struct AttendeeDetails {
        string Name;
        uint8 Age;
        string Email;
        address AttendeeAddress;
    }

    // Array of events created.
    EventStruct[] eventArray;

    //Mapping to track event Id details
    mapping(uint256 => EventStruct) eventMapping;

    //Event ID Counter
    uint256 EventIDCounter;

    function CreateEvent(
        string memory _title,
        string memory _details,
        string memory _host,
        string memory _datetime,
        string memory _location
    ) external {
        EventIDCounter = EventIDCounter + 1;

        uint256 _newEvent = EventIDCounter;

        EventStruct storage eventDetails = eventMapping[_newEvent];
        eventDetails.Id = _newEvent;
        eventDetails.Title = _title;
        eventDetails.Details = _details;
        eventDetails.Host = _host;
        eventDetails.DateTime = _datetime;
        eventDetails.Location = _location;

        eventArray.push(eventDetails);

        emit NewEventCreated(_newEvent, _title, _host);
    }

    function UpdateEvent(
        uint256 _id,
        string memory _title,
        string memory _details,
        string memory _host,
        string memory _datetime,
        string memory _location
    ) external {
        EventStruct storage eventDetailsUpdate = eventMapping[_id];

        eventDetailsUpdate.Title = _title;
        eventDetailsUpdate.Details = _details;
        eventDetailsUpdate.Host = _host;
        eventDetailsUpdate.DateTime = _datetime;
        eventDetailsUpdate.Location = _location;
    }

    function ViewEvent(uint256 _id) external view returns (EventStruct memory) {
        return eventMapping[_id];
    }

    function RegisterForEvent(
        uint256 _id,
        string memory _name,
        string memory _email,
        uint8 _age
    ) external {
        //eventMapping[_id].Registerd.push(msg.sender);

        AttendeeDetails memory attendeeDetails = AttendeeDetails(
            _name,
            _age,
            _email,
            msg.sender
        );
        EventStruct storage eventDetailsUpdate = eventMapping[_id];

        eventDetailsUpdate.AttendeeInfo.push(attendeeDetails);

        //DONE: Change to Capture details of the person eg. Name, Age etc. Not just the address.

        //TODO: Collect and Lock the NFT of the person registerd.
    }

    function DetailsOfPeopleRegisterd(
        uint256 _id
    ) external view returns (AttendeeDetails[] memory) {
        return eventMapping[_id].AttendeeInfo;

        //DONE: Returns details of people registerd for an event e.g Name, Age, etc.
    }

    function NumberOFPeopleRegisterd(
        uint256 _id
    ) external view returns (uint256) {
        return eventMapping[_id].AttendeeInfo.length;
    }

    function CaptureAttendance(uint256 _id, address _attendee) external {
        //TODO: Burn the NFT if captured as attended.
        //TODO: Mint new NFT with and increament on the MetaData of events attended.
    }

    function UnLockNFT(uint256 _id) external {
        //TODO: Check if event time is more than block.timestamp
        //TODO: Allow NFT to be UnLocked.
    }
}

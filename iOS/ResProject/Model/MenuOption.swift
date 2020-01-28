//
//  MenuOption.swift
//  ResProj
//
//  Created by Brian on 1/27/20.
//  Copyright © 2020 Brian. All rights reserved.
//

import UIKit

enum MenuOption: Int, CustomStringConvertible {
    
    case Profile
    
    var description: String {
        switch self {
        case .Profile: return "Meet the Team"
        }
    }
    
    var image: UIImage {
        switch self {
        case .Profile: return UIImage(named: "ic_person_outline_white_2x") ?? UIImage()
        }
    }
}

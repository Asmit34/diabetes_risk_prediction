import os
class TargetValueMapping:
    def __init__(self):
        self.negative: int = 0
        self.positive: int = 1

    def to_dict(self):
        return self.__dict__

    def reverse_mapping(self):
        mapping_response = self.to_dict()
        return dict(zip(mapping_response.values(), mapping_response.keys()))
    
